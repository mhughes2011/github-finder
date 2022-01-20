import React, {createContext, useReducer} from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)
    
    // Get initial users (testing purposes to make sure the api works)
    const fetchUsers = async() => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users`
            // , {
            //     headers: {
            //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            //     }
            // }
            // This isn't used because Github removed this token because it was saved publically to the repo.  This isn't needed it just increases the limit of requests.
        )

        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data
        })

    }

    // Set Loading function to use anywhere
    const setLoading = () => dispatch({type: 'SET_LOADING'})
    
    return <GithubContext.Provider value = {{
        users: state.users,
        loading: state.loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>   
}

export default GithubContext