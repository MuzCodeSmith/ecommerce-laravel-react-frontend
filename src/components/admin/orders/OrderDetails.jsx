import React from 'react'
import DashboardLayout from '../../common/DashboardLayout'

export const OrderDetails = () => {
    return (
        <div>
            <DashboardLayout innerShadow={false} pagetitle='Show Details' btnLabel='Back' btnLink='/admin/orders'>
                <div className="row">
                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body p-4">

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow">
                            <div className="card-body p-4">

                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </div>
    )
}
