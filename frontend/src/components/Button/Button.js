export default function Button({ name, ...rest }) {
  return (
    <button { ...rest }>{name}</button>
  )
}
