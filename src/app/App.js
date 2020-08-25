import React, { useState, useEffect } from "react";

const App = () => {
  const [name, setName] = useState({ title: "" });
  const [desc, setDesc] = useState({ description: "" });

  const [values, setValues] = useState([]);
  const [tasks, setTasks] = useState({ title: "", description: "" });

  useEffect(() => {
    dataLoad();
  }, [tasks]);

  function dataLoad() {
    console.log("Cargando");
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setValues(data);
      })
      .catch((error) => console.log(error));
  }

  const handleChanges = (e) => {
    const { name, value } = e.target;
    if (name == "title") {
      setName({ [name]: value });
    } else {
      setDesc({ [name]: value });
    }
  };
  const addTask = (e) => {
    console.log("llamado a addTask");

    const { title } = name;
    const { description } = desc;

    setTasks({ title, description });
    fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json();
        //console.log(res);
      })
      .then((data) => {
        M.toast({ html: "Saved" });
        setName({ title: "" });
        setDesc({ description: "" });
        //console.log(data);
      })
      .catch((err) =>
        console.log(`task setTasks a addTask ${JSON.stringify(tasks)}`)
      );
    e.preventDefault();
  };

  function modalEdit() {}
  return (
    <div>
      <nav className="light-blue darken-4">
        <div className="container">
          <a className="brand-logo" href="/">
            MERN Stack
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col s5">
            <div className="card">
              <div className="card-content">
                <form onSubmit={addTask}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        onChange={handleChanges}
                        type="text"
                        placeholder="title"
                        name="title"
                        value={name.title}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea
                        onChange={handleChanges}
                        placeholder="Task description"
                        className="materialize-textarea"
                        name="description"
                        value={desc.description}
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" className="btn light-blue darken-4">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col s7">
            <table className="highlight">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {values.map((i) => {
                  return (
                    <tr key={i._id}>
                      <td>{i.title}</td>
                      <td>{i.description}</td>
                      <td>
                        <button
                          onClick={() => {
                            fetch(`/api/tasks/${i._id}`, {
                              method: "DELETE",
                            }).then(() => {
                              M.toast({ html: "Deleted" });
                              setName({ title: "" });
                              setDesc({ description: "" });
                              dataLoad();
                            });
                          }}
                          className="btn light-blue darken-4"
                          style={{ marginRight: "2px" }}
                        >
                          <i className="material-icons">delete</i>
                        </button>

                        <button
                          data-target="modal1"
                          className="btn light-blue darken-4 modal-trigger"
                        >
                          <i className="material-icons">edit</i>
                        </button>
                        <div id="modal1" className="modal">
                          <div className="modal-content">
                            <h4>Modal Header</h4>
                            <p>A bunch of text</p>
                          </div>
                          <div className="modal-footer">
                            <a
                              href="#!"
                              className="modal-close waves-effect waves-green btn-flat"
                            >
                              Agree
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
