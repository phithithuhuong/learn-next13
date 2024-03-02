
"use client"
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';

const Youtube = () => {
    const router = useRouter()
    return <div>
        Youtube
        <Button  onClick={()=>router.push("/")} variant="success">Back</Button>
    </div>
}
export default Youtube;