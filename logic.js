/**
 * Track the trade of a commodity from one trader to another
 * @param {org.fordham.education.ModifyTranscript} modify - the trade to be processed
 * @transaction
 */

async function modifyTranscript(modify){
    const Assetregistry=await getAssetRegistry('org.fordham.education.Transcript');
    // const participantRegistryC = await getParticipantRegistry('org.fordham.education.Company');
    //const participantRegistryS = await getParticipantRegistry('org.fordham.education.Student'); // eslint-disable-line no-undef
    const factory=getFactory();
    const newasset=factory.newResource('org.fordham.education','Transcript',modify.mId);
    //modify aspects
    newasset.gpa=modify.gpa;
    newasset.remarks=modify.remarks;
    newasset.studentName=modify.studentName;
    newasset.studentId=modify.studentId;
    newasset.GraduationDate=modify.GraduationDate;
    newasset.issueDate=modify.issueDate;
  	newasset.createdSchool="Fordham University"
    //participants
    const SchoolRef=factory.newRelationship('org.fordham.education','School',getCurrentParticipant().getIdentifier());//add school
    newasset.school=SchoolRef; 
  	//const participantRegistryS = await getParticipantRegistry('org.fordham.education.Student');//get student participant
    //const toStudent = await participantRegistryS.get(modify.Student);
    newasset.student=factory.newRelationship('org.fordham.education','Student', getCurrentParticipant().getIdentifier());
    //newasset.student=StudentRef; 
  	const CompanyRef=factory.newRelationship('org.fordham.education','Company',getCurrentParticipant().getIdentifier());
    newasset.viewedBy=CompanyRef; 

  await Assetregistry.add(newasset);

}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.fordham.education.ModifyByStudent} change - the trade to be processed
 * @transaction
 */

async function modifyBy(change){
  //todo list student can add company that he wants to see in the list as well as  removing company
  // create an array?
  
  console.log('student changing company');
  const factory = getFactory();
  
  change.student.company.push(change.addCompany);
  

  
  const index=change.student.company.indexOf(change.removeCompany);
  if (index>-1){
    change.student.company.splice(index,1);
   }else  if (change.student.company !== change.newViewBy){
    throw new Error('Please delete the companies that are on the list')
  }
  	
  
  
  
  const participantRegistry=await getParticipantRegistry('org.fordham.education.Student');
  await participantRegistry.update(change.student);
  
  
  
  


  
  
  
  


}





