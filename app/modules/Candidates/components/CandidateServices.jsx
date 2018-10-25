import React, { Component } from 'react';

import '../less/CandidateServices.less'

const experienceMapping = {
    experienced: "Erfaren",
    beginner: "Nybörjare",
    no: "Ingen erfarenhet"
};

class CandidateServices extends Component {

    render() {
        const { employeeInfo, services } = this.props;

        const candidateServices = employeeInfo.services || [];

        const candidateServicesExpanded = candidateServices.map(candidateService => {
            const service = services.find(s => candidateService.serviceId == s.id) || {}
            if (service.archived) {
                return false;
            }
            return {
                candidateService: candidateService,
                service: service,
            }
        }).filter(s => !!s);

        return (
            <div className="candidate-services">
                <h3 className="sec-title">Intresserad av jobb inom</h3>
                {
                    candidateServicesExpanded.map((expandedService, key) => {
                        return (
                            <div className="row candidate-service" key={key}>
                                <div className="-name col-md-6">
                                    {expandedService.service.name}
                                </div>
                                <div className="-exp col-md-6 text-right">
                                    {experienceMapping[expandedService.candidateService.experience]}
                                </div>
                                {
                                    candidateServicesExpanded.length === (key+1) ?
                                    null
                                    :
                                    <div className="-separator col-md-12"></div>
                                }
                            </div>
                        )
                    })
                }
                <hr className="hr-separator-1" />
            </div>
        )
    }
}

export default CandidateServices;
