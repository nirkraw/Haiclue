import React from 'react'; 

class Tile extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let type = this.props.type; 
        this.props.toggleTile(e, type); 
    }

    render() {
        let currentColor = this.props.currentColor; 
        let tileWord = this.props.tile[currentColor];
        return(
            <>
            {(this.props.display) ? (<div className={`color-${currentColor} tile`}
                    onClick={this.handleClick}>
                    {tileWord}
                </div>) : <div className="emptyTileSpace">{null}</div>  }
            </> 
        ) 
    }

}

export default Tile; 

