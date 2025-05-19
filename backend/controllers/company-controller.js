import companySchema from '../models/company-model.js';

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await companySchema.findOne({ name:companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }

        const newCompany = await companySchema.create({
            name:companyName,
            userId: req.userId // Assuming you have the userId from authentication middleware
        });
        return res.status(201).json({
            message: "Company created successfully",
            success: true,
            company: newCompany
        });


    } catch (error) {
        console.error("Error creating company:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
        
    }


}



export const getCompany = async (req, res) =>{
try {
    const userId = req.userId;
    const companies = await companySchema.find({userId});

    if(!companies) {
        return res.status(404).json({
            message:"Companies not found.",
            success:false
        }) 
    }

    return res.status(200).json({
        companies,
        success:false
    }) 


} catch (error) {
    console.log(error)
}

}


export const getCompanyByID = async (req, res) => {
    try {
        const companyId = req.params.id; // Extract companyId from request params
        const company = await companySchema.findById(companyId); // Pass companyId directly

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            company,
            success: true, // Corrected success to true
        });
    } catch (error) {
        console.error("Error fetching company by ID:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};





export const updateCompany = async (req,res) => {
    const {name, description,website, location} = req.body;
    const file = req.file;


    const updateData = {name,description, website, location};

    const company = await companySchema.findByIdAndUpdate(req.params.id, updateData,{new:true});

    if(!company){
        return res.status(404).json({
            message:"Company not updated.",
            success:false
        }) 
    }


    return res.status(200).json({
        message: "Company information updated",
        success:false
    }) 

}
















// export const RegisterCompany = async (req, res) => {
//     try {
//         const { name, description, website, location, logo } = req.body;

//         if (!name || !description || !website || !location || !logo) {
//             return res.status(400).json({
//                 message: "All fields are required",
//                 success: false
//             });
//         }

//         const newCompany = await companySchema.create({
//             name,
//             description,
//             website,
//             location,
//             logo,
//             userId: req.userId // Assuming you have the userId from authentication middleware
//         });

//         return res.status(201).json({
//             message: "Company created successfully",
//             success: true,
//             company: newCompany
//         });
//     } catch (error) {
//         console.error("Error creating company:", error);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false
//         });
//     }
// }

// export const getCompany = async (req, res) => {
//     try {
//         const companyId = req.params.id;

//         if (!companyId) {
//             return res.status(400).json({
//                 message: "Company ID is required",
//                 success: false
//             });
//         }

//         const company = await companySchema.findById(companyId);

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Company retrieved successfully",
//             success: true,
//             company
//         });
//     } catch (error) {
//         console.error("Error retrieving company:", error);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false
//         });
//     }
// }



