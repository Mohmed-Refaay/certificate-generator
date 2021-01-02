import styled from "styled-components";

const FormContainer = styled.div`
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.315);
  width: 95%;
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  border-radius: 10px;

  .Img {
    width: 100%;
    margin-bottom: 20px;
  }

  .btn {
    margin-top: 30px !important;
    background-color: #4285f4 !important;
    color: white !important;

    @media screen and (max-width: 570px) {
      width: 95%;
    }

    &:disabled {
      background-color: rgb(212, 212, 212) !important;
    }
  }

  .inputsContainer {
    display: flex;
    justify-content: space-between;
    padding: 0px 10px;

    @media screen and (max-width: 570px) {
      flex-direction: column;
    }
  }
  .nameInput {
    @media screen and (max-width: 570px) {
      margin-bottom: 20px;
    }
  }

`;

export default FormContainer;
