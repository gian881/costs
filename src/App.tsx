import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from './components/layout/Container'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Home } from './pages/Home'
import { NewProject } from './pages/NewProject'
import { ProjectPage } from './pages/Project'
import { Projects } from './pages/Projects'

export function App() {
  return (
    <Router>
      <Navbar />
      <Container main customClass='min-height'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

