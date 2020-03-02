import React from 'react';
import './addNewUser.css';
import baseUrl from "../enviroment.js";

class AddNewUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                technology: null,
                role: ''
            },
            technologies: [],
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);

        fetch(baseUrl + 'technology')
            .then(response => response.json())
            .then(data => {
                this.setState({ technologies: data });
            });

    };

    handleChange(event) {

        const { name, value } = event.target;
        const { user } = this.state;

        if (name == "technology") {
            const newuser = this.state.user;
            newuser["technology"] = value;
            this.setState({ user: newuser });           
        } else {
            this.setState({
                user: {
                    ...user,
                    [name]: value
                }
            });
        }
    }

    handleBack(){
        let path = `/calendar`;
        this.props.history.push(path);
        window.location.reload();
    }

    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.email && user.role) {
            fetch(baseUrl + 'user', {
                method: 'POST',
                body: JSON.stringify({
                    firstName: this.state.user.firstName,
                    lastName: this.state.user.lastName,
                    username: this.state.user.username,
                    email: this.state.user.email,
                    technology: JSON.parse(this.state.user.technology),
                    role: parseInt(this.state.user.role)}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.text())
        }

      
    }


    render() {
        const { user, submitted } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Add new user</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control input" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control input" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control input" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control input" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.role ? ' has-error' : '')}>
                        <label htmlFor="role">Role</label>
                        <select className="form-control input" name="role" value={user.role} onChange={this.handleChange} >
                            <option>Choose your option</option>
                            <option value="0">Admin</option>
                            <option value="1">TT</option>
                            <option value="2">DM</option>
                        </select>
                        {submitted && !user.role &&
                            <div className="help-block">Role is required</div>
                        }
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="technology">Technology</label>
                        <select className="form-control input" name="technology" value={user.technology} onChange={this.handleChange} >
                            <option>Choose your option</option>
                            {this.state.technologies.map((tech) =>
                                <option key={tech} value={JSON.stringify(tech)}>{tech.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <button onClick={this.handleSubmit} className="button3">ADD</button>
                        <button onClick={this.handleBack} className="button4">BACK</button>
                    </div>
                </form>
            </div>
        )
    };
}

export default AddNewUser;

