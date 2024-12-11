class FundProjects {
    constructor(data) {
        this.sNo = data['s.no'];
        this.amtPledged = data['amt.pledged'];
        this.percentageFunded = data['percentage.funded'];
    }

    getFormattedPledgeAmount() {
        return `$${this.amtPledged.toLocaleString()}`;
    }

    getFormattedPercentage() {
        return `${this.percentageFunded}%`;
    }
}

export default FundProjects;
