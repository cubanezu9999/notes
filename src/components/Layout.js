import MainNavigatoion from "./MainNavigation";

function Layout(props) {
  return (
    <div>
      <MainNavigatoion />
      <main> {props.children} </main>{" "}
    </div>
  );
}

export default Layout;
