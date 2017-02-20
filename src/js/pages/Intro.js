import React from "react"
import Slider from "react-slick"
import { Link } from "react-router"


export default class Intro extends React.Component {
    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }
        return (

            <div class="intro">
                <Slider {...settings}>
                    <div>
                        <div class="slick-panel centered">
                            <div class="text-container">
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Vais jogar um jogo de confiança!</h5>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Neste jogo de confiança existem dois jogadores: 1 seller e 1 buyer</h5>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Tu vais assumir o papel de Buyer!</h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="slick-panel centered">
                            <div class="text-container">
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Vai ser apresentado um conjunto de 18 sellers</h5>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Cada seller tem associado um video de perfil e uma reputação</h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="slick-panel centered">
                            <div class="text-container">
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Com base no video e reputação tens de decidir se compras ou não um item desse seller</h5>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Após a tua decisão de compra, o seller poderá ou não enviar o item</h5>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="slick-panel centered">
                            <div class="text-container">
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> A reputação é representada num ranking de 5 estrelas</h5>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Cada estrela representa a percentagem de vezes que o seller enviou o item nas ultimas transações, após um buyer ter decidido comprar</h5>
                                <div class="img-wrapper"><img src="img/stars.png" /></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="slick-panel centered">
                            <div class="text-container">
                                <h5 style={{marginBottom:"20px"}}><i class="fa fa-chevron-right" aria-hidden="true"></i> No video de perfil o seller dá as seguintes informações:</h5>
                                <div class="list">
                                    <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Nome</h5>
                                    <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Idade</h5>
                                    <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Local de Residência</h5>
                                    <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Dois hobbies</h5>
                                </div>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Existem sellers que optaram por não colocar um video de perfil</h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="slick-panel centered matrix-slide">
                            <div class="text-container">
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Em cada transação vais dispor de 35 unidades de dinheiro virtual</h5>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Se decidires não comprar o item manténs as 35  unidades</h5>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Se comprares e o seller enviar, ficas com 50 unidades</h5>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Se comprares e o seller não enviar, ficas com 0 unidades</h5>
                                <div class="img-wrapper"><img src="img/matrix.png" /></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="slick-panel centered">
                            <div class="text-container">
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> O objetivo é no final das 18 rondas teres o <strong>máximo de dinheiro possivel!</strong></h5>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Os resultados das transações apenas são apresentados no final</h5>
                                <h5><i class="fa fa-chevron-right" aria-hidden="true"></i> Mediante os resultados poderás ganhar até X rebuçados</h5>
                                
                                <Link to={'/maintest'}><button class="btn btn-block">Começar!</button></Link>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        )
    }
}
