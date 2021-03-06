import { createApplication } from 'test/support/Helpers'
import Model from 'app/Model'
import Repo from 'app/repo/Repo'

describe('Repo – Create – Attributes', () => {
  it('should increment the field value when creating a record if the field type is `increment`', () => {
    class User extends Model {
      static entity = 'users'

      static fields () {
        return {
          id: this.increment(),
          name: this.attr('')
        }
      }
    }

    createApplication('entities', [{ model: User }])

    const state = {
      name: 'entities',
      users: { data: {} }
    }

    const data = { name: 'John' }

    const expected = {
      name: 'entities',
      users: { data: {
        '1': { $id: 1, id: 1, name: 'John' }
      }}
    }

    Repo.create(state, 'users', data)

    expect(state).toEqual(expected)
  })

  it('should reset increment value when creating a record', () => {
    class User extends Model {
      static entity = 'users'

      static fields () {
        return {
          id: this.increment(),
          name: this.attr('')
        }
      }
    }

    createApplication('entities', [{ model: User }])

    const state = {
      name: 'entities',
      users: { data: {
        '3': { $id: 3, id: 3, name: 'Jane' }
      }}
    }

    const data = { name: 'John' }

    const expected = {
      name: 'entities',
      users: { data: {
        '1': { $id: 1, id: 1, name: 'John' }
      }}
    }

    Repo.create(state, 'users', data)

    expect(state).toEqual(expected)
  })

  it('should increment value when creating multiple records', () => {
    class User extends Model {
      static entity = 'users'

      static fields () {
        return {
          id: this.increment(),
          name: this.attr('')
        }
      }
    }

    createApplication('entities', [{ model: User }])

    const state = {
      name: 'entities',
      users: { data: {
        '3': { $id: 3, id: 3, name: 'Jane' }
      }}
    }

    const data = [{ name: 'John' }, { name: 'Jane' }]

    const expected = {
      name: 'entities',
      users: { data: {
        '1': { $id: 1, id: 1, name: 'John' },
        '2': { $id: 2, id: 2, name: 'Jane' }
      }}
    }

    Repo.create(state, 'users', data)

    expect(state).toEqual(expected)
  })

  it('should increment value when creating multiple records with some field value defined', () => {
    class User extends Model {
      static entity = 'users'

      static fields () {
        return {
          id: this.increment(),
          name: this.attr('')
        }
      }
    }

    createApplication('entities', [{ model: User }])

    const state = {
      name: 'entities',
      users: { data: {
        '3': { $id: 3, id: 3, name: 'Jane' }
      }}
    }

    const data = [{ name: 'John' }, { id: 8, name: 'Jane' }]

    const expected = {
      name: 'entities',
      users: { data: {
        '8': { $id: 8, id: 8, name: 'Jane' },
        '9': { $id: 9, id: 9, name: 'John' }
      }}
    }

    Repo.create(state, 'users', data)

    expect(state).toEqual(expected)
  })

  it('should increment the field value when inserting record if the field type is `increment`', () => {
    class User extends Model {
      static entity = 'users'

      static fields () {
        return {
          id: this.increment(),
          name: this.attr('')
        }
      }
    }

    createApplication('entities', [{ model: User }])

    const state = {
      name: 'entities',
      users: { data: {
        '1': { $id: 1, id: 1, name: 'John' },
        '3': { $id: 3, id: 3, name: 'Jane' }
      }}
    }

    const data = { name: 'Johnny' }

    const expected = {
      name: 'entities',
      users: { data: {
        '1': { $id: 1, id: 1, name: 'John' },
        '3': { $id: 3, id: 3, name: 'Jane' },
        '4': { $id: 4, id: 4, name: 'Johnny' }
      }}
    }

    Repo.insert(state, 'users', data)

    expect(state).toEqual(expected)
  })

  it('should increment the multiple field value when inserting record', () => {
    class User extends Model {
      static entity = 'users'

      static fields () {
        return {
          id: this.increment(),
          name: this.attr('')
        }
      }
    }

    createApplication('entities', [{ model: User }])

    const state = {
      name: 'entities',
      users: { data: {
        '1': { $id: 1, id: 1, name: 'John' },
        '3': { $id: 3, id: 3, name: 'Jane' }
      }}
    }

    const data = [{ name: 'Johnny' }, { name: 'Josh' }]

    const expected = {
      name: 'entities',
      users: { data: {
        '1': { $id: 1, id: 1, name: 'John' },
        '3': { $id: 3, id: 3, name: 'Jane' },
        '4': { $id: 4, id: 4, name: 'Johnny' },
        '5': { $id: 5, id: 5, name: 'Josh' }
      }}
    }

    Repo.insert(state, 'users', data)

    expect(state).toEqual(expected)
  })

  it('should increment the multiple field value with some passed data has increment value defined when inserting record', () => {
    class User extends Model {
      static entity = 'users'

      static fields () {
        return {
          id: this.increment(),
          name: this.attr('')
        }
      }
    }

    createApplication('entities', [{ model: User }])

    const state = {
      name: 'entities',
      users: { data: {
        '1': { $id: 1, id: 1, name: 'John' },
        '3': { $id: 3, id: 3, name: 'Jane' }
      }}
    }

    const data = [{ name: 'Johnny' }, { id: 8, name: 'Josh' }]

    const expected = {
      name: 'entities',
      users: { data: {
        '1': { $id: 1, id: 1, name: 'John' },
        '3': { $id: 3, id: 3, name: 'Jane' },
        '8': { $id: 8, id: 8, name: 'Josh' },
        '9': { $id: 9, id: 9, name: 'Johnny' }
      }}
    }

    Repo.insert(state, 'users', data)

    expect(state).toEqual(expected)
  })

  it('should increment value when inserting multiple records and multiple increment field', () => {
    class User extends Model {
      static entity = 'users'

      static fields () {
        return {
          id: this.increment(),
          otherId: this.increment(),
          name: this.attr('')
        }
      }
    }

    createApplication('entities', [{ model: User }])

    const state = {
      name: 'entities',
      users: { data: {
        '3': { $id: 3, id: 3, otherId: 5, name: 'Jane' }
      }}
    }

    const data = [{ name: 'John' }, { name: 'Johnny' }]

    const expected = {
      name: 'entities',
      users: { data: {
        '3': { $id: 3, id: 3, otherId: 5, name: 'Jane' },
        '4': { $id: 4, id: 4, otherId: 6, name: 'John' },
        '5': { $id: 5, id: 5, otherId: 7, name: 'Johnny' }
      }}
    }

    Repo.insert(state, 'users', data)

    expect(state).toEqual(expected)
  })

  it('should increment value of relation field', () => {
    class User extends Model {
      static entity = 'users'

      static fields () {
        return {
          id: this.increment(),
          name: this.attr(''),
          posts: this.hasMany(Post, 'user_id')
        }
      }
    }

    class Post extends Model {
      static entity = 'posts'

      static fields () {
        return {
          id: this.increment(),
          user_id: this.attr(null),
          title: this.attr('')
        }
      }
    }

    createApplication('entities', [{ model: User }, { model: Post }])

    const state = {
      name: 'entities',
      users: { data: {} },
      posts: { data: {} }
    }

    const data = {
      name: 'John',
      posts: [
        { user_id: 1, title: 'Title 01' },
        { user_id: 2, title: 'Title 02' }
      ]
    }

    const expected = {
      name: 'entities',
      users: { data: {
        '1': { $id: 1, id: 1, name: 'John', posts: ['_no_key_23', '_no_key_25'] }
      }},
      posts: { data: {
        '1': { $id: 1, id: 1, user_id: 1, title: 'Title 01' },
        '2': { $id: 2, id: 2, user_id: 2, title: 'Title 02' }
      }}
    }

    Repo.insert(state, 'users', data)

    expect(state).toEqual(expected)
  })
})
