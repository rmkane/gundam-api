import React, { useCallback } from 'react';

function Contact() {
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData: FormData = new FormData(form);

    fetch('http://localhost:8000/email', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Connection: 'keep-alive',
        Accept: '*',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        /* eslint-disable-next-line no-console */
        console.log(json);
      });
  }, []);

  return (
    <>
      <h1>Contact Us</h1>
      <form
        className="uk-form-horizontal"
        encType="multipart/form-data"
        name="contact-form"
        onSubmit={onSubmit}
      >
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="contact-name">
            Name
          </label>
          <div className="uk-form-controls">
            <input
              id="contact-name"
              className="uk-input"
              name="name"
              type="text"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="contact-email">
            Email
          </label>
          <div className="uk-form-controls">
            <input
              id="contact-email"
              className="uk-input"
              name="email"
              type="email"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="contact-subject">
            Subject
          </label>
          <div className="uk-form-controls">
            <input
              id="contact-subject"
              className="uk-input"
              name="subject"
              type="text"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="contact-message">
            Message
          </label>
          <div className="uk-form-controls">
            <textarea
              id="contact-message"
              className="uk-textarea"
              name="message"
              rows={8}
            />
          </div>
        </div>
        <div className="uk-flex uk-flex-right tm-gap-medium">
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="uk-button uk-button-danger" type="reset">
            Reset
          </button>
          <button className="uk-button uk-button-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Contact;
