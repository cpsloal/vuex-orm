import { schema, Schema as NormalizrSchema } from 'normalizr'
import * as _ from './support/lodash'
import Attrs, { Fields } from './repo/Attribute'
import HasOne from './repo/relations/HasOne'
import BelongsTo from './repo/relations/BelongsTo'
import HasMany from './repo/relations/HasMany'
import HasManyBy from './repo/relations/HasManyBy'
import BelongsToMany from './repo/relations/BelongsToMany'
import Model from './Model'

export type IdAttribute = (value: any, parent: any, key: string) => any

export type ProcessStrategy = (value: any, parent: any, key: string) => any

export interface Schemas {
  [entity: string]: schema.Entity
}

export default class Schema {
  /**
   * Count to create unique id for record that missing its primary key.
   */
  static count: number = 0

  /**
   * Create a schema of given model.
   */
  static one (model: typeof Model, schemas: Schemas = {}): schema.Entity {
    const thisSchema = new schema.Entity(model.entity, {}, {
      idAttribute: this.idAttribute(model),
      processStrategy: this.processStrategy(model)
    })

    const definition = this.definition(model, {
      ...schemas,
      [model.entity]: thisSchema
    })

    thisSchema.define(definition)

    return thisSchema
  }

  /**
   * Create a array schema of givene model.
   */
  static many (model: typeof Model, schemas: Schemas = {}): schema.Array {
    return new schema.Array(this.one(model, schemas))
  }

  /**
   * Create a dfinition from given fields.
   */
  static definition (model: typeof Model, schemas: Schemas = {}): NormalizrSchema {
    return this.build(model, model.fields(), schemas)
  }

  /**
   * Build a definition schema.
   */
  static build (model: typeof Model, fields: Fields, schemas: Schemas = {}): NormalizrSchema {
    return _.reduce(fields, (definition, field, key) => {
      if (!Attrs.isAttribute(field)) {
        definition[key] = this.build(model, field, schemas)

        return definition
      }

      if (field instanceof HasOne) {
        const relation = field.related

        const s = schemas[relation.entity]

        definition[key] = s ? s : this.one(relation, schemas)

        return definition
      }

      if (field instanceof BelongsTo) {
        const relation = field.parent

        const s = schemas[relation.entity]

        definition[key] = s ? s : this.one(relation, schemas)

        return definition
      }

      if (field instanceof HasMany) {
        const relation = field.related

        const s = schemas[relation.entity]

        definition[key] = s ? new schema.Array(s) : this.many(relation, schemas)

        return definition
      }

      if (field instanceof HasManyBy) {
        const relation = field.parent

        const s = schemas[relation.entity]

        definition[key] = s ? new schema.Array(s) : this.many(relation, schemas)

        return definition
      }

      if (field instanceof BelongsToMany) {
        const relation = field.related

        const s = schemas[relation.entity]

        definition[key] = s ? new schema.Array(s) : this.many(relation, schemas)

        return definition
      }

      return definition
    }, {} as { [key: string]: NormalizrSchema })
  }

  /**
   * Create the merge strategy.
   */
  static idAttribute (model: typeof Model): IdAttribute {
    return (value: any, _parent: any, _key: string) => {
      const id = model.id(value)

      return id !== undefined ? id : `_no_key_${this.count++}`
    }
  }

  /**
   * Create the process strategy.
   */
  static processStrategy (model: typeof Model): ProcessStrategy {
    return (value: any, _parent: any, _key: string) => {
      return { ...value, $id: model.id(value) }
    }
  }
}
