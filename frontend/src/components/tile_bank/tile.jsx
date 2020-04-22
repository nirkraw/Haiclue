import React from 'react'; 

class Tile extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props;
        this.handleClick= this.handleClick.bind(this)
    }

    handleClick
    render() {
        return(
            <div className={`color-${this.props.currentColor} tile`}
                onClick={this.handleClick}>
                {this.props.tile[this.props.currentColor]}
            </div>
        ) 
    }

}

export default Tile; 