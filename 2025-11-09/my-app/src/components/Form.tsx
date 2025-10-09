import React, { useEffect, useState } from "react"

const Form = () => {
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = useState("")

  /*   const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
  }) */

  useEffect(() => {
    console.log({ firstName, lastName, email })
  }, [firstName, lastName, email])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Submitted: ${firstName} ${lastName} (${email})`)

    setFirstName("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
