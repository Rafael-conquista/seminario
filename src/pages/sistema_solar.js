import React from 'react';
import { useState } from 'react';
import './sistema_solar.css'
import GravitySimulation from '../GravitySimulation';

function SistemaSolar(anterior='') {
    const [gravity, setGravity] = useState('')
    const [planet,setPlanet] = useState('')

    function planeta_selecionado(event){
        let elementoId = event.target.id;
        if(elementoId === 'orbita_terra'){
            elementoId = 'terra'
            setGravity(9.8)
        }
        if(elementoId === 'lua'){
            setGravity(1.6)
        }
        if(elementoId === 'sol'){
            setGravity(274)
        }
        if(planet === elementoId){
            elementoId = ''
        }else if(planet !== ''){
            elementoId = ''

        }

        setPlanet(elementoId)
    }
    return(
        <>
            <div className="tela_dividida">
                <div id="divirTela" className="geral">
                    <div className="sistema_solar">
                        <div id="sol" onClick={planeta_selecionado} className="sol">
                            <div className="legenda_sol">
                                <div className="centro_sol">
                                    <div id="legenda">Sol</div>
                                </div>
                                <div className="ponta"></div>
                            </div>
                        </div>
                        <div id="terra" className="terra">
                            <div id="lua" className="lua">
                            </div>
                        </div>
                        <div id="orbita_sol" className="orbita_sol">
                            <div className="legenda_terra" id='terra'>
                                <div id="centro_terra" className="centro_terra" >
                                    <div>Terra</div>
                                </div>
                            </div>
                            <div id="orbita_terra" className="orbita_terra" onClick={planeta_selecionado}>
                                <div onClick={planeta_selecionado} className="legenda_lua" id='lua'>
                                    <div id="centro_lua" className="centro_lua">
                                        <div>Lua</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contextoPlaneta" className='gravityName'>
                    {planet ? <button className='simulacaobutton' onClick={() => {
                        setPlanet('')
                        setGravity('')
                    }}>X</button> : ''}
                    
                    <h1>{planet ? planet : ''}</h1>
                    {planet ? <GravitySimulation gravity={gravity} /> : ''}
                    
                    {planet ? <button onClick={() =>{
                        const prevPlanet = planet
                        setPlanet('')
                        setTimeout(() => {
                            setPlanet(prevPlanet)
                        }, 0);
                    }}>Reiniciar</button> : ''}
                    
                </div>
            </div>
            
        </>
    )
}

export default SistemaSolar