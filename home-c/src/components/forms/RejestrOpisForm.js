import React from "react";
import { Form, FormGroup, Button, Input } from 'reactstrap';

class RejestrOpisForm extends React.Component {
  state = {
    data: {
      adres: this.props.rejOpis.adres,
      nazwa: this.props.rejOpis.nazwa,
      nazwa_zm: this.props.rejOpis.nazwa_zm,
      lok_id: this.props.rejOpis.lok_id,
      rejestr: this.props.rejOpis.rejestr,
      rodzaj: this.props.rejOpis.rodzaj,
      ster_wy: this.props.rejOpis.ster_wy
    },
    // loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    // if (Object.keys(errors).length === 0) {
      // this.setState({ loading: true });
      // console.log(this.state.data)
      // const that=this
      // setTimeout(()=>that.setState({loading: false}), 3000)
      // this.props
      //   .submit(this.state.data)
      //   .catch(err =>
      //     this.setState({ errors: err.response.data.errors, loading: false })
      //   );
    // }
  };

  validate = data => {
    const errors = {};

    if (!data.id) errors.id = "Id nie może byc puste";
    // if (!data.nazwaLokalu) errors.nazwaLokalu = "Nazwa lokalu nie może byc pusta";
    // if (!data.poziom) errors.poziom = "Pole poziom może byc puste";
    // if (data.poziom!=="parter" && data.poziom!=="pietro") errors.poziom = "Dozwolone wartości to parter albo pietro"

    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div>
        <Form inline onSubmit={this.onSubmit}>
          <FormGroup className="m-1">
            {/* <label htmlFor="nazwaLokalu">nazwa</label> */}
            <Input
              type="text"
              id="adres"
              name="adres"
              value={data.adres}
              onChange={this.onChange}
              className={
                errors.adres ? "form-control is-invalid" : "form-control"
              }
            />
          </FormGroup>

          <FormGroup className="m-1">
            {/* <label htmlFor="poziom">poziom</label> */}
            <Input
              type="text"
              id="nazwa"
              name="nazwa"
              value={data.nazwa}
              onChange={this.onChange}
              className={
                errors.nazwa ? "form-control is-invalid" : "form-control"
              }
            />
          </FormGroup>

          <FormGroup className="m-1">
            {/* <label htmlFor="id">Id</label> */}
            <Input
              type="text"
              id="rodzaj"
              name="rodzaj"
              value={data.rodzaj}
              onChange={this.onChange}
              className={
                errors.rodzaj ? "form-control is-invalid" : "form-control"
              }
            />
          </FormGroup>

          <Button >
            Zapisz zmiany
          </Button>
         {data.nazwa_zm} | {data.rejestr} | {data.ster_wy}
            <div >{errors.id}</div>
            <div>{errors.poziom}</div>
            <div>{errors.nazwaLokalu}</div>
        </Form>
        
    </div>

    );
  }
}

export default RejestrOpisForm;
