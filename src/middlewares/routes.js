import { Database } from './database.js'
import { randomUUID } from 'node:crypto' 
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database

export const routes = [
    {
        method: 'GET',
        url: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query 
            
            const tasks = database.select('tasks', search ? { 
                title: search,
                description: search,
            }: null)

            return res.end(JSON.stringify(tasks))   
        }
    },
    {
        method: 'POST',
        url: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const {title, description} = req.body

            const task = ({
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at:null,
            })

            database.insert('tasks', task)
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        url:  buildRoutePath('/tasks/:id'), 
        handler: (req, res) => {
            const { id }= req.params

            database.delete('tasks',id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        url:  buildRoutePath('/tasks/:id'),         
        handler: (req, res) => {
            const { id }= req.params
            const { title, description } = req.body
            const updated_at = new Date()
            const completed_at = null
            let created_at = null

            const task = database.select('tasks', { 
                id: id,
            })

            if (task) {
                created_at = task[0].created_at
            }
            
            database.update('tasks',id,{title,description,completed_at,created_at,updated_at})    

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        url:  buildRoutePath('/tasks/:id/complete'),         
        handler: (req, res) => {
            const { id } = req.params
            const completed_at = new Date()

            const task = database.select('tasks', { 
                id: id,
            })

            if (task) {
                const { title, description, created_at, updated_at } = task[0]

                database.update('tasks',id,{title,description,completed_at,created_at,updated_at})    
            }

            return res.writeHead(204).end()
        }
    }
]