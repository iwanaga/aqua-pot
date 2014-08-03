function StateMachine(option){
    option = option || {};

    this.state           = 'OK';
    this.threshold       = option.threshold       || 100;
    this.thresholdMargin = option.thresholdMargin || 50;
}

StateMachine.prototype.determineTransition = function(newData){
    if ( this.state === 'OK' && !this._isSoilHumidityOK(newData) ) {
        // OK -> NG
        this.updateState(newData);
        return 'NG';
    } else if ( this.state === 'NG' && this._isSoilHumidityOK(newData) ) {
        // NG -> OK
        this.updateState(newData);
        return 'OK';
    }
    // OK -> OK or NG -> NG
    return 'no transition';
};

StateMachine.prototype._isSoilHumidityOK = function(newData){
    // suppress mass notification by data fluctuation.
    // add threshold margin for only [NG -> OK] transition.
    if (this.state === 'NG') {
        return (newData > this.threshold + this.thresholdMargin);
    }
    return (newData > this.threshold);
};

StateMachine.prototype.updateState = function(newData) {
    this.state = (this._isSoilHumidityOK(newData) === true) ? 'OK' : 'NG';
};

module.exports = StateMachine;
