export default function Todo({id, body}) {
    return (
        <li key={id}>{body}</li>
    )
}
