import React, { Component } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Particles from "react-particles-js";
import "./App.css";
// import Clarifai from "clarifai";
import { connect } from "react-redux";
import {
    onInputChange,
    displayFaceBox,
    onButton,
    onRouteChange
} from "./redux/action";

// const app = new Clarifai.App({
//     apiKey: "cf39f1e2508e42bfad68809809c6b39d"
// });

const particleOptions = {
    particles: {
        number: {
            value: 200,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 4
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: false,
                speed: 109.63042366068159,
                size_min: 17.053621458328248,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
};

class App extends Component {
    state = {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
    };
    loadUser = data => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    };
    // constructor(props){
    //   super(props);
    //
    //   this.state = {
    //       input:'',
    //       imageUrl:'',
    //       box:{},
    //       route:'signin',
    //       isSignedIn:false
    //   };
    // }
    // onInputChange=(event)=>{
    //     // console.log(event.target.value);
    //     this.setState({input:event.target.value});
    // }

    calculateFaceLocation = data => {
        const clarifaiFace =
            data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height
        };
    };
    // displayFaceBox=(box)=>{
    //     this.setState({box:box});
    // }
    onButtonSubmit = () => {
        this.props.onButton(this.props.input);

        // this.setState({imageUrl:this.state.input})
        // app.models
        //     .predict(Clarifai.FACE_DETECT_MODEL, this.props.input)
        fetch("https://smartbrain-api.herokuapp.com/imageUrl", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: this.props.input })
        })
            .then(res => res.json())
            .then(response => {
                if (response) {
                    fetch("https://smartbrain-api.herokuapp.com/image", {
                        method: "put",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: this.state.user.id })
                    })
                        .then(res => res.json())
                        .then(count => {
                            this.setState(
                                Object.assign(this.state.user, {
                                    entries: count
                                })
                            );
                        })
                        .catch(console.log);
                }
                this.props.displayFaceBox(this.calculateFaceLocation(response));
            })
            .catch(err => console.log(err));
        // do something with response
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);

        // function(err) {
        //   // there was an error
        // }
    };
    // onRouteChange=(route)=>{
    //     if(route==='signout')
    //     {
    //         this.setState({isSignedIn:false})
    //     }
    //     else if (route==='home') {
    //         this.setState({isSignedIn:true})
    //
    //     }
    //     this.setState({route:route})
    // }
    render() {
        const { isSignedIn, imageUrl, route, box } = this.props;
        return (
            <div className="App">
                <Particles className="particles" params={particleOptions} />

                <Navigation
                    isSignedIn={isSignedIn}
                    onRouteChange={this.props.onRouteChange}
                />
                {route === "home" ? (
                    <div>
                        <Logo />
                        <Rank
                            entries={this.state.user.entries}
                            name={this.state.user.name}
                        />
                        <ImageLinkForm
                            onInputChange={this.props.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                ) : route === "signin" ? (
                    <Signin
                        onRouteChange={this.props.onRouteChange}
                        loadUser={this.loadUser}
                    />
                ) : (
                    <Register
                        onRouteChange={this.props.onRouteChange}
                        loadUser={this.loadUser}
                    />
                )}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        input: state.input,
        imageUrl: state.imageUrl,
        box: state.box,
        route: state.route,
        isSignedIn: state.isSignedIn
    };
};

const mapDispatchToProps = Dispatch => {
    return {
        onInputChange: event => Dispatch(onInputChange(event)),
        displayFaceBox: box => Dispatch(displayFaceBox(box)),
        onButton: input => Dispatch(onButton(input)),
        onRouteChange: route => Dispatch(onRouteChange(route))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
