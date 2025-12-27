import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Olive Edge | Digital Flagship',
    description: 'Clinical. Organic. Tactical. Premium technical apparel and equipment for the modern operator.',
    keywords: 'tactical gear, techwear, military surplus, outdoor equipment, olive edge',
};

export default Meta;
