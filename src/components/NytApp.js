import React, {Component} from 'react';
import NytResults from './NytResults';
const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'DHC8zG9CsgLlYt3knAvYjpM5em6i9Jox';


class NytFetch extends Component {
    constructor(){
        console.log("Constructor")
        super()
        this.state = {
            search: '',
            startDate: "",
            endDate: "",
            pageNumber: 0,
            results: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fetchArticle(){
        let url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`;
        url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
        url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;

        fetch(url, {
            method: 'GET'
        }).then(res => res.json())
        .then(res => {
            this.setState({
                results: res.response.docs
            })
        })
        .catch(error => console.log (error))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState(
            {search: event.target.value},
            {startDate: event.target.value},
            {endDate: event.target.value},
            {pageNumber: this.state.pageNumber}
        )
        this.fetchArticle()
    }

    changePageNumber = (event, direction) => {
        event.preventDefault();
        if (direction === 'down'){
            this.setState(
                {pageNumber: this.state.pageNumber - 1}
                )
                this.fetchArticle()

        }
        if (direction === 'up'){
            this.setState(
                {pageNumber: this.state.pageNumber + 1}
            )
            this.fetchArticle()
        }
    }

    doingASearch = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitSearch = event => {
        event.preventDefault();
        this.props.filterBySearchTerm(this.state.search)
        this.setState({
            search: ''
        })
    }

    filterBySearchTerm=(search) => {
        this.setState({
            theLocationFilter: search,
        })

    }



    render(){
        console.log("render")
        return(
            <div>
                <form onSubmit={this.submitSearch}>
                    <label htmlFor="searchTerm">
                        <strong>Search:</strong>
                        <input type="text" name="searchTerm" value={this.state.search} onChange={this.doingASearch}/>
                        <input type="submit" value="submit"/>
                    </label>

                </form>
            </div>
        )
    }



    // render(){
    //     return(
    //         <div className="main">
    //             <div className="mainDiv">
    //                 <form onSubmit={(event) => this.handleSubmit(event)}>
    //                     <span>Enter a single search term (required): </span>
    //                     <input type="text" name="search" onChange={this.state.search} required />
    //                     <br />
    //                     <span>Enter a start date: </span>
    //                     <input type="date" name="startDate" pattern="[0-9]{8}" onChange={this.state.startDate} />
    //                     <br />
    //                     <span>Enter an end date: </span>
    //                     <input type="date" name="endDate" pattern="[0-9]{8}" onChange={this.state.endDate} />
    //                     <br />
    //                     <button className="submit">Submit search</button>
    //                 </form>
    //                 {
    //                     this.state.results  > 0 ? <NytResults results = {this.state.results} changePage={this.changePageNumber} /> : null
    //                 }
    //             </div>
    //         </div>
    //     )
    // }

}

export default NytFetch;