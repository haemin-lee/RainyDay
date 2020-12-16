import { useEffect, useState } from 'react'
import get_client from '../../api/finastra'

function Test() {
    const [data, setData] = useState([])

    useEffect(() => {
        test_api()

        async function test_api() {
            const options = {
                accountContext: 'VIEW-ACCOUNT',
            }

            const client = get_client()
            console.log(client)
            const data = await client.account_information.get_accounts_information(
                options
            )
            setData(data.data)
        }
    }, [])

    return (
        <div className="container">
            <code>{JSON.stringify(data)}</code>
        </div>
    )
}

export default Test
