import React from 'react'

interface IFirstState {
  texts?: string[];
  play?: boolean;
  x?: number;
  speed?: number;
}

export default class FirstState extends React.Component<IFirstState, any> {
  refs: {
    group: any,
    anim: any,
    image: Phaser.Image
  }

  constructor () {
    super();
    this.state = {
      texts: [],
      play: 'play',
      x: 0,
      speed: 100
    }
  }

  componentDidMount () {
    this.refs.group.instance.game.state.onUpdateCallback = () => {
      if (this.refs.anim.instance.isPlaying) {
        this.setState({
          x: this.state.x - 1
        })
      }
    }
    window['__setSpeed'] = (speed) => {
      this.setState({
        speed
      })
    }
  }

  render () {
    const { texts, x } = this.state
    return <group ref='group' name='out'>
      <group name='inner'>
        <image inputEnabled={true}
          ref='image' x={x} y={-400} scale={new Phaser.Point(2, 2)} assetKey={'thorn_lazur'} smoothed={false}></image>
        <sprite x={200} y={360} scale={new Phaser.Point(4, 4)}
          smoothed={false} assetKey={'mummy'}>
          <animation
            ref='anim'
            state={this.state.play}
            frameRate={5}
            loop={true}
            onStart={this.walkStartHandle}
            onLoop={this.walkLoopHandle}
            onComplete={this.walkStopHandle}
            enableUpdate={true}
            name={'walk'}>
          </animation>
        </sprite>
      </group>
      <group hidden={true}>
        {texts.map((v, index) => {
          return <text x={32} y={(index + 1) * 32} fill='white' key={index}>
            {v}
            <word color='red'>{' ' + index}</word>
          </text>
        }
        )}
      </group>
    </group>
  }

  walkStartHandle = () => {
    this.setState({
      texts: ['Animation started']
    })
  }

  walkLoopHandle = (sprite: Phaser.Sprite, animation: Phaser.Animation) => {
    if (animation.loopCount === 1) {
      this.setState({
        texts: ['Animation started', 'Animation looped']
      })
    } else {
      this.setState({
        texts: ['Animation started', 'Animation looped x' + animation.loopCount],
        play: 'done'
      })
    }
  }

  walkStopHandle = () => {
    this.setState({
      texts: ['Animation started', 'Animation looped x2', 'Animation stopped']
    })
  }
}
