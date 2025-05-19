import jobSchema  from "../models/job-model.js";

export const  postJob = async (req, res) => {

    try {

        const { title, description,requirements, location, salary, jobType, experience, position, companyId} = req.body;
        const userId = req.userId;

        // if (!title || !description || !location || !salary || !jobType || !experience || !position) {
        //     return res.status(400).json({ message: "Please fill all the fields" });
        // }

        const job = await jobSchema.create({
            title,
            description,
            requirements: requirements.split(","),
            location,
            salary: Number(salary),
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            cerated_by: userId,
        });
        return res.status(201).json({ 
            message: "Job created successfully", job, 
            success: true
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const getAllJobs = async (req, res) => {

    try {
        
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { jobType: { $regex: keyword, $options: "i" } },
            ],
        };

         const jobs = await jobSchema.find(query);

        if(!jobs){
            return res.status(404).json(
                { message: "No jobs found", success: false }
            );
        }

        return res.status(200).json({ message: "Jobs fetched successfully", jobs, success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        
    }    
}


export const getJobById = async (req, res) => {

    try {
        
        const jobId = req.params.id;
        // const job = await jobSchema.findById(jobId).populate("company").populate("created_by");
        const job = await jobSchema.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }


        return res.status(200).json({ message: "Job fetched successfully", job, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// admin 


export const getAdminJobs = async (req, res) => {

try {
    const adminId = req.userId;
    const jobs = await jobSchema.find({ created_by: adminId });
    if (!jobs) {
        return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ message: "Jobs fetched successfully", jobs, success: true });

} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
}


}


 

















// export const getJobById = async (req, res) => {

//     try {
//         const { id } = req.params;
//         const job = await jobSchema.findById(id).populate("company").populate("created_by");

//         if (!job) {
//             return res.status(404).json({ message: "Job not found", success: false });
//         }

//         return res.status(200).json({ message: "Job fetched successfully", job, success: true });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }



// export const getAllJobs = async (req, res) => {
//     try {
//         const jobs = await jobSchema.find().populate("company").populate("created_by");
//         return res.status(200).json({ message: "Jobs fetched successfully", jobs, success: true });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

// export const getAllJobs = async (req, res) => {

//     try {
    

//         const { page = 1, limit = 10 } = req.query;
//         const skip = (page - 1) * limit;

//         const jobs = await jobSchema.find()
//             .populate("company")
//             .populate("created_by")
//             .skip(skip)
//             .limit(limit);

//         const totalJobs = await jobSchema.countDocuments();

//         return res.status(200).json({
//             message: "Jobs fetched successfully",
//             jobs,
//             totalJobs,
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" });
        
//     }    
// }




