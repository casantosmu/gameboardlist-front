import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import useGameboards from "../../store/hooks/useGameboards";
import { FormField as IFormField } from "../../types/interfaces";
import Button from "../Button/Button";
import FileUploader from "../FileUploader/FileUploader";
import FormField from "../FormField/FormField";
import Input from "../Input/Input";
import StyledCreateForm from "./StyledCreateForm";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    image: "",
    rating: "",
    name: "",
    year: "",
    category: "",
    weight: "",
    playersMin: "",
    playersMax: "",
    timeMin: "",
    timeMax: "",
    authorship: "",
  });
  const {
    authorship,
    category,
    weight,
    name,
    playersMin,
    playersMax,
    rating,
    timeMin,
    timeMax,
    year,
  } = formData;
  const { postGameboard } = useGameboards();
  const navigation = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postGameboard(formData);
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event && event.target.files) {
      const fileUploaded = event.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        [event.target.id]: fileUploaded,
      }));
    }
  };

  const formFields: Array<IFormField> = [
    {
      id: "image",
      label: "Image",
      isRequired: true,
      children: (
        <FileUploader
          id="image"
          children={
            <>
              <FontAwesomeIcon icon="plus" style={{ paddingRight: "6px" }} />
              Upload
            </>
          }
          onChange={onChangeFile}
          isRequired={true}
        />
      ),
    },
    {
      id: "rating",
      label: "Rating",
      isRequired: true,
      children: (
        <Input
          id="rating"
          type="number"
          value={rating}
          onChange={onChange}
          required={true}
          placeholder="7"
        />
      ),
    },
    {
      id: "name",
      label: "Name",
      isRequired: true,
      children: (
        <Input
          id="name"
          type="text"
          value={name}
          onChange={onChange}
          required={true}
          placeholder="Carcassonne"
        />
      ),
    },
    {
      id: "year",
      label: "Year",
      isRequired: true,
      children: (
        <Input
          id="year"
          type="number"
          value={year}
          onChange={onChange}
          required={true}
          placeholder="2020"
        />
      ),
    },
    {
      id: "category",
      label: "Category",
      isRequired: true,
      children: (
        <select value={category} onChange={onChange} id="category">
          {config.gameboards.categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      ),
    },
    {
      id: "weight",
      label: "Weight",
      isRequired: true,
      children: (
        <Input
          id="weight"
          type="number"
          value={weight}
          onChange={onChange}
          required={true}
          placeholder="2"
        />
      ),
    },
    {
      label: "Players",
      isRequired: true,
      children: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <Input
            id="playersMin"
            type="number"
            value={playersMin}
            onChange={onChange}
            required={true}
            placeholder="2 players"
            aria-label="Minimum number of players"
          />
          <Input
            id="playersMax"
            type="number"
            value={playersMax}
            onChange={onChange}
            required={true}
            placeholder="4 players"
            aria-label="Maximum number of players"
          />
        </div>
      ),
    },
    {
      label: "Time",
      isRequired: true,
      children: (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <Input
            id="timeMin"
            type="number"
            value={timeMin}
            onChange={onChange}
            required={true}
            placeholder="35min"
            aria-label="Minimum game duration"
          />
          <Input
            id="timeMax"
            type="number"
            value={timeMax}
            onChange={onChange}
            required={true}
            placeholder="45 min"
            aria-label="Maximum game duration"
          />
        </div>
      ),
    },
    {
      id: "authorship",
      label: "Author/s",
      children: (
        <Input
          id="authorship"
          type="text"
          value={authorship}
          onChange={onChange}
          placeholder="Klaus-Jürgen Wrede"
        />
      ),
    },
  ];

  return (
    <StyledCreateForm
      onSubmit={onSubmit}
      aria-label="Add a boardgame"
      noValidate
    >
      <div className="create-form__fields-wrapper">
        {formFields.map((formField) => (
          <FormField {...formField} key={formField.label} />
        ))}
      </div>
      <div className="create-form__buttons-wrapper">
        <Button type="submit">Submit</Button>
        <Button onClick={() => navigation("/")}>Cancel</Button>
      </div>
    </StyledCreateForm>
  );
};

export default CreateForm;
