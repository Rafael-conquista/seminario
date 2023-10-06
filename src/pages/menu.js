import React from 'react';
import planets from '../images/sistema_solar_wallpaper.jpg'
import planets4k from '../images/sistema_solar_wallpaper_4k.jpg'
import './menu.css'

function Menu(){
    return(
        <>
        <div className='all'>
        <img src={planets4k} alt="planets" className="tela"/>
            <div className="paginasFisica">
            <div>
                <h2 className='h2'>Física aplicadas em JavaScript</h2>
                <hr className='.hr'></hr>
                <li className="tema">
                    <img src={planets} alt='vazio' className="tema_imagem" onClick={() => window.location.href = '/sistemaSolar'}/> 
                    <div className="legenda ">Sistema Solar</div>
                </li>    
                <li className="tema">
                    <img src={planets} className="tema_imagem" alt='vazio' onClick={() => window.location.href = '/mola'}/> 
                    <div className="legenda ">Simulação de Mola</div>
                </li> 
                <li className='tema'>
                    <img src={planets} className="tema_imagem" alt='vazio' onClick={() => window.location.href = '/pendulum'}/> 
                    <div className="legenda ">Simulação de pêndulo</div>
                </li>
                <li className='tema'>
                    <img src={planets} className="tema_imagem" alt='vazio' onClick={() => window.location.href = '/colisao'}/> 
                    <div className="legenda ">Simulação de colisão</div>
                </li>
                <li className='tema'>
                    <img src={planets} className="tema_imagem" alt='vazio' onClick={() => window.location.href = '/cloth'}/> 
                    <div className="legenda ">Cloth</div>
                </li>
                <li className='tema'>
                    <img src={planets} className="tema_imagem" alt='vazio' onClick={() => window.location.href = '/NewtonCradle'}/> 
                    <div className="legenda ">pêndulo de Newton</div>
                </li>
                <li className='tema'>
                    <img src={planets} className="tema_imagem" alt='vazio' onClick={() => window.location.href = '/game'}/> 
                    <div className="legenda ">Game</div>
                </li>
            </div>
            </div>
        </div>
        </>
        
    )
}

export default Menu