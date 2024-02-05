import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Form } from './Form'
import { Readme } from './Readme'
import { ChakraProvider } from '@chakra-ui/react'

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <Readme />,
  },
  {
    path: '/form',
    element: <Form />,
  },
])

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}
