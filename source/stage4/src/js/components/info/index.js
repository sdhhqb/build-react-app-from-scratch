import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/info/actions';

// info页面
class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('get forecast data');
    this.props.actions.getForecast("chengdu");
  }

  render() {
    var info = this.props.info;
    var wData = info.wData && info.wData[0] || null;
    var infoList = [];

    if (!wData) {
      return (
        <div>这里是信息页面。</div>
      );
    }

    return (
      <div>
        <div>这里是信息页面。</div>
        <p>更新时间：{wData.basic.update.loc}</p>
        <p>城市：{wData.basic.city}</p>
        <p>白天：{wData.daily_forecast[0].cond.txt_d}</p>
        <p>夜间：{wData.daily_forecast[0].cond.txt_n}</p>
        <p>温度：{wData.daily_forecast[0].tmp.min} 到 {wData.daily_forecast[0].tmp.max} ℃</p>
        <p>---</p>
        <p>明天：{wData.daily_forecast[1].cond.txt_d} {wData.daily_forecast[1].tmp.min} 到 {wData.daily_forecast[1].tmp.max} ℃</p>
      </div>
    );
  }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
  return {
    info: state.app.info
  }
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
  var boundActionCreators = bindActionCreators(actions, dispatch);
  return {
    actions: boundActionCreators
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
