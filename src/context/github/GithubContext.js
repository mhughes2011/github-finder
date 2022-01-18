import React, {createContext, useState} from 'react'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    
    const fetchUsers = async() => {
        const response = await fetch(`${GITHUB_URL}/users`
            // , {
            //     headers: {
            //         Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
            //     }
            // }
            // This isn't used because Github removed this token because it was saved publically to the repo.  This isn't needed it just increases the limit of requests.
        )

        const data = await response.json()

        setUsers(data)
        setLoading(false)
    }

    return <GithubContext.Provider value = {{
        users,
        loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>   
}

export default GithubContext