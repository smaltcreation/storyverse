Template.homeChart.onCreated(function () {
    this.subscribe('homeChart');
});

Template.homeChart.onRendered(function () {
    let self = this;

    Tracker.autorun(function (computation) {
        if (self.subscriptionsReady()) {
            computation.stop();

            let statistics = Collection.Statistics.find();
            let series = [
                {
                    data: _.map(statistics.fetch(), function (statistic) {
                        return [statistic.createdAt, statistic.totalNodes];
                    }),
                    color: '#ff4081'
                }
            ];

            self.$('.flot-chart-content').plot(series, {
                grid: {
                    borderWidth: 1,
                    backgroundColor: '#fff'
                },
                xaxis: {
                    mode: 'time'
                },
                lines: {
                    show: true,
                    steps: true
                },
                points: {
                    show: false
                }
            });
        }
    });
});
