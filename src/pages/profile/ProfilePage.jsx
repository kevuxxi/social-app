import React from 'react'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
    return (
        <div>
            <header>
                <Link to="/feed">Volver al feed</Link>
            </header>
            <main>
                <p>user info</p>
                <section>
                    post
                </section>
            </main>
        </div>
    )
}

export default ProfilePage