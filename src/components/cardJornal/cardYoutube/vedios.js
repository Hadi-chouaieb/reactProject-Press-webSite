import React from 'react';
import { Card } from 'react-bootstrap';
import './vedios.css';

const YouTubeCard = () => {
    const propsyturl = "https://www.youtube.com/embed/cyLt3qeLbsQ"; // Use the embedded URL
    var propsyttitle = "قيس سعيد في زيارة احد المساجد";
    var propsytdescription = "صرح سعيّد أيضًا أنه يؤيد طريقة لا مركزية ثلاثية المستويات وغير مباشرة لانتخاب الممثلين التشريعيين الوطنيين، وبعض عناصر الديمقراطية المباشرة، ويعتقد أنه يجب انتخاب الممثلين المحليين على أساس الشخصية وبنيتها الأساسية بدلاً من الأيديولوجية السياسية. نظرًا لغموضه النسبي وافتقاره إلى الحملات الانتخابية، لم تكن العديد من مواقفه محددة جيدًا باستثناء موقفه الاجتماعي المحافظ.";
    return (
       <div className='container-fuild'>
         <Card className="col-md-6 col-sm-12 col-lg-4 container mt-2">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    className="embed-responsive-item"

                    title="YouTube Video"
                    src={propsyturl}
                    allowFullScreen
                />
            </div>
            <Card.Body>
                <Card.Title>{propsyttitle}</Card.Title>
                <Card.Text>
                    {propsytdescription}
                </Card.Text>
            </Card.Body>
        </Card>
       </div>
    );
};

export default YouTubeCard;
