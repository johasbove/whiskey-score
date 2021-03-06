import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";
import {client} from '../utils/ApiClient';
import ReviewsFilters from "./ReviewsFilters";
import AppHeader from "./AppHeader";
import {Layout, Button, Row, Col} from 'antd';

import '../../assets/stylesheets/reviews.scss';
import {ReviewsContextProvider} from "./ReviewsContext";
import ReviewsTextFilter from "./ReviewsTextFilter";
import ReviewsTable from "./ReviewsTable";

const {Content, Footer} = Layout;


export default function Reviews(props) {

  if (props.location.state === undefined) {
    return (<Redirect to={{pathname: "/"}}/>);
  }

  const [reviews, setReviews] = useState([]);
  const {id, name} = props.location.state;

  useEffect(() => {
    client(`/api/v1/reviews?user_id=${id}`)
      .then(response => {
        setReviews(response);
      })
      .catch(error => console.log(error.message));
  }, [])


  return (
    <ReviewsContextProvider userId={id}>
      <Layout>
      <AppHeader name={name}/>

      <Content className="site-layout">
        <div className="site-layout-background">
          <Row>
            <Col span={5}>
              <ReviewsFilters/>
            </Col>

            <Col span={19}>
              <ReviewsTextFilter/>
              <div style={{marginTop: 20}}>
                <ReviewsTable/>
              </div>
              <hr className="my-4"/>
              <Button type="primary" style={{marginLeft: 8, float: 'right'}}>
                <Link
                  className="btn btn-lg custom-button"
                  role="button"
                  to={{
                    pathname: '/review',
                    state: {
                      id: id, name: name
                    }
                  }}
                >
                  Add Review
                </Link>
              </Button>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{textAlign: 'center'}}>Powered by 🥃</Footer>
    </Layout>
    </ReviewsContextProvider>
  )
}