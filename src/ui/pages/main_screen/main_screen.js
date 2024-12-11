import React, {useState, useEffect} from "react";
import './main_screen.css';
import FundProjects from "../../../models/fund_project";
import AppLoader from "../../components/loader";
import AppButton from "../../components/app_button";

const MainScreen = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json")
            .then(response => response.json())
            .then(data => {
                const projectInstances = data.map(projectData => new FundProjects(projectData));
                setProjects(projectInstances);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container">
            <h1 id="main-heading">Highly Funded Kickstarter Projects</h1>

            {loading ? (
                <AppLoader/>
            ) : (
                <>
                    <table aria-labelledby="main-heading" aria-describedby="projects-table-description">
                        <thead>
                        <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Percentage Funded</th>
                            <th scope="col">Amount Pledged</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentProjects.map((project, index) => (
                            <tr key={project.sNo}>
                                <td>{project.sNo + 1}</td>
                                <td>{project.getFormattedPercentage()}</td>
                                <td>{project.getFormattedPledgeAmount()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <AppButton
                            text="Previous"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            ariaLabel="Previous page"
                            testId="previous-button"
                        />
                        <span aria-live="polite">Page {currentPage}</span>
                        <AppButton
                            text="Next"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage * projectsPerPage >= projects.length}
                            ariaLabel="Next page"
                            testId="next-button"
                        />

                    </div>
                </>
            )}
        </div>
    );
};

export default MainScreen;
