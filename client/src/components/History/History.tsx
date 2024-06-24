import classes from './History.module.css';
import { useHistory } from '@/hooks/useHistory';
import { getImage } from '@/utilities/imageUtils';
import { Pieces } from '@/types/enums';
import { Row } from '@/components/ui/Row';
import { Col } from '@/components/ui/Col';


const ColumnMap :{ [key: number]: string } = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H'
}


export function History() {
    const { history } = useHistory();

    return (
        <Col xs={12} s={12} m={12} l={3} xl={3}>
            <Row className={classes.historyContainer}>
                <Col>
                    <b>History</b>
                    <ul className={classes.history}>
                        {history.map(({ origin, destination }, idx) => 
                            <li key={`history-record-${idx}`}>
                                
                                <img className={classes.img} src={getImage(origin.type, origin.team)} alt={`${origin.team} ${origin.type}`} />

                                {ColumnMap[origin.x]}{origin.y+1}&rarr;{ColumnMap[destination.x]}{destination.y+1}

                                {destination.type !== Pieces.EMPTY && 
                                    <>
                                        <img 
                                            className={classes.img} 
                                            src={getImage(destination.type, destination.team)} 
                                            alt={`${destination.team} ${destination.type}`} 
                                        />
                                        taken
                                    </>
                                }
                            </li>
                        )}
                    </ul>
                </Col>
            </Row>
        </Col>
    );
}
