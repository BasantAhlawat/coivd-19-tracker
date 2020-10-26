import React from 'react'
import {Typography, Card, CardContent} from "@material-ui/core"
import './infobox.css'

function InfoBox({title,cases,total,active,isRecovered, ...props}) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRecovered && 'infoBox--isRecovered'}`}>
            <CardContent class="infoBox__content">

            <Typography class="infoBox__title" color="textSecondary">{title}</Typography>

            <h2 class={`infoBox__cases ${title==="Recovered" && 'infoBox--isRecovered'}`}>+{cases}</h2>

            <Typography class="infoBox__total"  color="textSecondary">Total: {total}</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
