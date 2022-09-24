import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import useGameboards from "../../store/gameboards/useGameboards";
import Button from "../Button/Button";
import FileUploader from "../FileUploader/FileUploader";
import FormField, { IFormField } from "../FormField/FormField";
import Input from "../Input/Input";
import Select from "../Select/Select";
import StyledCreateForm from "./StyledCreateForm";

const CreateForm = (): JSX.Element => {
  const [formData, setFormData] = useState({
    image: "",
    rating: "",
    name: "",
    year: "",
    category: "Select one",
    weight: "",
    playersMin: "",
    playersMax: "",
    timeMin: "",
    timeMax: "",
    authorship: "",
  });

  const {
    image,
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
  const { postGameboards } = useGameboards();
  const navigation = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("rating", rating);
    formData.append("name", name);
    formData.append("year", year);
    formData.append("category", category);
    formData.append("weight", weight);
    formData.append("players[min]", playersMin);
    formData.append("players[max]", playersMax);
    formData.append("time[min]", timeMin);
    formData.append("time[max]", timeMax);
    formData.append("authorship", authorship || "-");

    postGameboards(formData);
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
    const fileUploaded = event.target.files![0];
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: fileUploaded,
    }));
  };

  const formFields: Array<IFormField> = [
    {
      id: "image",
      label: "Image",
      status: "required",
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
      description: "Select the ranking from 1 to 10",
      label: "Rating",
      status: "required",
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
      description: "Enter game name",
      label: "Name",
      status: "required",
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
      description: "Enter release year",
      status: "required",
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
      description: "Select one of the categories",
      status: "required",
      children: (
        <Select
          onChange={onChange}
          id="category"
          items={["Select one", ...config.gameboards.categories]}
          value={category}
        />
      ),
    },
    {
      id: "weight",
      label: "Weight",
      description: "Enter weight from 1 to 5",
      status: "required",
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
      description: "Enter the min and max number of players",
      status: "required",
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
      description: "Enter the min and max minutes of game time",
      status: "required",
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
      description: "Introduce game designers",
      status: "optional",
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
        <Button type="submit">Add new</Button>
        <Button onClick={() => navigation("/")} semantic="secondary">
          Cancel
        </Button>
      </div>
    </StyledCreateForm>
  );
};

export default CreateForm;
