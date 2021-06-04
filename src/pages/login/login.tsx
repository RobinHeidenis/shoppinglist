import LoginForm from "../../components/LoginForm";

interface LoginProps {
    authenticateFunction: (username: string, password: string) => Promise<boolean>
}

export default function Login(props: LoginProps) {
    return (
        <>
            <LoginForm authenticateFunction={props.authenticateFunction}/>
        </>
    )
}
