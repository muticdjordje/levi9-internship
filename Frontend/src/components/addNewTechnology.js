import React from 'react';
import './addNewTechnology.css';
import baseUrl from "../enviroment.js";
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class AddNewTechnology extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            technology: {
                name: '',
                color: '',
            },
            submitted: false,
            displayColorPicker: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);

    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.hex });

        const newtec = this.state.technology;
        newtec["color"] = color.hex;
        this.setState({ technology: newtec });
    };

    handleChangeName(event) {

        
        const { name, value } = event.target;
        const { technology } = this.state;

        this.setState({
            technology: {
                ...technology,
                [name]: value
            }
        });
    }

    handleBack(){
        let path = `/calendar`;
        this.props.history.push(path);
        window.location.reload();
    }

    handleSubmit(event) {
        event.preventDefault();

        const { technology } = this.state;

        this.setState({ submitted: true });
        
        if (technology.color && technology.name) {
            fetch(baseUrl + 'technology', {
                method: 'POST',
                body: JSON.stringify(this.state.technology),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.text())
        }

      
    }


    render() {
        const { technology, submitted } = this.state;

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: this.state.color,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Add new technology</h2>
                <form name="form">
                    <div className={'form-group' + (submitted && !technology.name ? ' has-error' : '')}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control input" name="name" value={technology.name} onChange={this.handleChangeName} />
                        {submitted && !technology.name &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="color">Color</label>
                        <div>
                            <div style={styles.swatch} onClick={this.handleClick}>
                                <div style={styles.color} />
                            </div>
                            {this.state.displayColorPicker ? <div style={styles.popover}>
                                <div style={styles.cover} onClick={this.handleClose} />
                                <SketchPicker color={this.state.technology.color} onChange={this.handleChange} />
                            </div> : null}
                        </div>
                    </div>
                    <div className="form-group">
                        <button onClick={this.handleSubmit} className="button1">ADD</button>
                        <button onClick={this.handleBack} className="button2">BACK</button>
                    </div>
                </form>
            </div>
        )
    };
}

export default AddNewTechnology;

