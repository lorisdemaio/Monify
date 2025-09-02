import { Component } from 'react';
import { Link } from 'react-router';
import '../index.css';

export default class AboutCard extends Component {

  render() {
    return (
    <>
      <Link to={`/infogoal/${this.props.link}`}>
        <div className='size-[250px] min-w-[250px] flex flex-col justify-center items-center gap-5 p-5 rounded-4xl shadow-2xl' 
        style={{ background: this.props.bg }}>
          <div>
              {
                  this.props.SvgIcon ? this.props.SvgIcon : null
              }
              {
                  this.props.ImgIcon ? 
                  <img 
                      src={this.props.ImgIcon} 
                      height={this.props.h} 
                      width={this.props.w} 
                      alt="icon"  
                      loading='lazy'
                      draggable={false} 
                  /> : null
              }
          </div>
          <span className='text-xl font-semibold'>
              {this.props.titolo}
          </span>
          <span>
            {this.props.saldo}/{this.props.obiettivo}€
          </span>
        </div>
      </Link>
    </>
  )
  }
}