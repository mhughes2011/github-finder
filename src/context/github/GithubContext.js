import React, {createContext, useReducer} from 'react'
import { createRoutesFromChildren } from 'react-router-dom'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)
    
    // Get search results
    const searchUsers = async(text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`)

        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })

    }

    // Get a single user's profile
    const getUser = async(login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`)

        if(response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
    
            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }


    }

    // Get users repos
    const getUserRepos = async(login) => {
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10,
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)

        const data = await response.json()

        dispatch({
            type: 'GET_REPOS',
            payload: data
        })

    }

    // Clear the search results (users from state)
    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS'
        })
    }

    // Set Loading function to use anywhere
    const setLoading = () => dispatch({type: 'SET_LOADING'})
    
    return <GithubContext.Provider value = {{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        getUser,
        clearUsers,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>   
}

export default GithubContext