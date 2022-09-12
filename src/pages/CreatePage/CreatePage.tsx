import Container from "../../components/Container/Container";
import CreateForm from "../../components/CreateForm/CreateForm";
import StyledCreatePage from "./StyledCreatePage";

const CreatePage = (): JSX.Element => {
  return (
    <Container breakpoint="large" style={{ padding: "1rem 0 2rem" }}>
      <StyledCreatePage>
        <h1 className="create-page__heading">Add new</h1>
        <CreateForm />
      </StyledCreatePage>
    </Container>
  );
};

export default CreatePage;
