import React, {PropsWithChildren} from "react";
import Breadcrumbs from './Layout/Breadcrumbs/Breadcrumbs';
import Layout from './Layout/layout.tsx';

const Theme: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <Layout>
            <Breadcrumbs />
            {children}
        </Layout>
    );
}

export default Theme;