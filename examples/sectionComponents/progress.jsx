import React from 'react'
import Pod from 'components.js'


var rand = function(factor = 100){
    return Math.floor(Math.random()*factor)
}

var ProgressExamples = React.createClass({
    getInitialState: function(){ return {bars: [], circles: []}},

    types: ['base','primary','info','success','danger','warning','secondary'],

    getRandom: function(){
        var bars = [], circles = [];
        this.types.forEach(function(type){
            var random = rand();
            bars.push(<Pod.Progress key={type} value={rand()} styler={{kind:type}} />)
            circles.push(<Pod.CircularProgress key={type+'_circ'} value={random} styler={{kind:type, style:{marginLeft: 15}}}><span style={{color:'#aaa'}}>{random}</span></Pod.CircularProgress>)
        })
        this.setState({bars: bars, circles: circles})
    },

    nuts: false,
    goNuts: function(e){
        e.preventDefault();
        if(this.nuts){
            clearInterval(this.nuts);
            this.nuts = false;
        } else {
            var _this = this;
            _this.nuts = setInterval(function(){
                _this.getRandom()
            }, 200)
        }
    },

    componentDidMount: function(){
        this.getRandom();
    },

    render: function(){
        return (
            <div key="something" onClick={this.getRandom}>
                <p style={{marginBottom: '8px'}}><strong>Examples: </strong>Click on these to randomize [or <a href="#" onClick={this.goNuts}>Go nuts</a>]</p>

                <Pod.Grid>
                    <Pod.Grid_Cell styler={{lg:6}}>
                        {this.state.bars}
                    </Pod.Grid_Cell>

                    <Pod.Grid_Cell styler={{lg:6}}>
                        {this.state.circles}
                    </Pod.Grid_Cell>
                </Pod.Grid>
            </div>
        );
    }
})

var Progressing = React.createClass({
    getInitialState: function(){
        return {
            value: 0,
            uniformValue: 0,
            btnText: 'pause'
        }
    },
    loop: false,
    uLoop: false,
    startLoop: function(){
        var _this = this;
        this.loop = setInterval(function(){
            var currentValue = _this.state.value;
            _this.setState({
                value: currentValue + Math.floor(Math.random()*10),
                uniformValue: _this.state.uniformValue + 1
            })
            if(_this.state.value >= 100) {
                //clearInterval(_this.loop) //Where's the fun in that?
                _this.setState({
                    value: 0 //GO AGAIN
                })
            }
        }, 500);
        this.uLoop = setInterval(function(){
            _this.setState({
                uniformValue: _this.state.uniformValue + 1
            })
            if(_this.state.uniformValue >= 100) {
                _this.setState({
                    uniformValue: 0 //GO AGAIN
                })
            }
        }, 200);
    },
    toggleLoop: function(e){
        e.preventDefault();
        if(this.loop) {
            clearInterval(this.loop)
            this.loop = false
            clearInterval(this.uLoop)
            this.uLoop = false
            this.setState({ btnText: 'resume' })
        } else {
            this.startLoop()
            this.setState({ btnText: 'pause' })
        }
    },
    componentDidMount: function(){
        this.startLoop();
    },
    componentWillUnmount: function(){
        clearInterval(this.loop)
        clearInterval(this.uLoop)
        this.loop = false
        this.uLoop = false
    },
    render: function(){
        return (
            <div>
                <p style={{marginBottom: '8px'}}>Natural progression example [<a href="#" onClick={this.toggleLoop}>{this.state.btnText}</a>]</p>
                <Pod.Progress value={this.state.value} />
                <br />
                <Pod.CircularProgress styler={{size:150}} value={this.state.value}>
                    <div style={{fontSize: 30, fontWeight: 200}}>{this.state.value}%</div>
                    <span style={{color: '#aaa'}}>progress...</span>
                </Pod.CircularProgress>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Pod.CircularProgress styler={{size:150, kind:'success'}} value={this.state.uniformValue}>
                    <div style={{fontSize: 26}}>${this.state.uniformValue*13}</div>
                    <span style={{color: '#aaa'}}>Dollas!</span>
                </Pod.CircularProgress>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Pod.CircularProgress styler={{size:150, kind:'danger'}} value={this.state.uniformValue}>
                    <span style={{color: '#aaa'}}>{this.state.uniformValue*3} bats</span>
                </Pod.CircularProgress>
            </div>
        );
    }
});

export default class ProgressSection extends React.Component {

    render () {
        return (
            <Pod.Section key={'progress'}>
                <Pod.ContentWrap>
                    <Pod.Heading>Progress</Pod.Heading>

                    <ProgressExamples />

                    <br />

                    <p style={{marginBottom: '8px'}}>Different strokes (styler prop)</p>
                    <Pod.Grid>
                        <Pod.Grid_Cell styler={{lg:6}}>
                            <Pod.Progress styler={{kind:'info', stroke: 2}} value={rand()} />
                            <Pod.Progress styler={{kind:'info', stroke: 8}} value={rand()} />
                            <Pod.Progress styler={{kind:'info', stroke: 12}} value={rand()} />
                        </Pod.Grid_Cell>

                        <Pod.Grid_Cell styler={{lg:6}}>
                            <Pod.CircularProgress styler={{kind:'danger', stroke: 2, style:{marginLeft: 15}}} value={rand()} />
                            <Pod.CircularProgress styler={{kind:'danger', stroke: 8, style:{marginLeft: 15}}} value={rand()} />
                            <Pod.CircularProgress styler={{kind:'danger', stroke: 12, style:{marginLeft: 15}}} value={rand()} />
                        </Pod.Grid_Cell>
                    </Pod.Grid>

                    <br /> <Progressing /> <br />

                    <p style={{marginBottom: '8px'}}>Indeterminate (No props passed. value defaults to -1 which renders indeterminate progress)</p>
                    <Pod.Progress styler={{kind:'danger'}} />

                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}
