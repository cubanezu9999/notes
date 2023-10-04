import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import notepad from "./notepad.jpg";
function Home() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}> Welcome to Students Notes </h1>
      <h2 className={classes.title}>
        A Notes Aplication that is meant for Students
      </h2>
      <img src={notepad} alt={notepad} className={classes.image} />

      <h2 className={classes.title}>
        <Link to="/Register"> Register </Link>
      </h2>
      <h2 className={classes.title}>
        <Link to="/Login"> Login </Link>
      </h2>
    </div>
  );
}

export default Home;
