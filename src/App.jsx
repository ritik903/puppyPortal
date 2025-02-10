import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import AppLayout  from "./layout/AppLayout"
import DogList from "./Components/DogList"
import DogDetails from "./Components/DogDetails"
import "./App.css"

//=============== new trick router 6.4v============

const App = () => {

  const router = createBrowserRouter([

    {
      path: "/",
      // element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <DogList />,

        },
        {
          path: "/dog/:id",
          element: <DogDetails />,

        },
      ]
    },



  ])

  return <RouterProvider router={router} />
}
export default App

//=============== new trick router 6.4v  end============



//=============== old trick router start============

// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
// import { Home } from "./sitepages/Home"
// import { About } from "./sitepages/About"
// import { Service } from "./sitepages/Service"
// import { Contact } from "./sitepages/Contact"


// const App = () => {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/service" element={<Service />} />
//         <Route path="/contact" element={<Contact />} />
//       </Route>
//     )
//   );
//   return <RouterProvider router={router} />
// }
// export default App


//=============== old trick router end============
