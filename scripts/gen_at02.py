#!/usr/bin/env python3
import json
import os

def save_chapter(filename, var_name, data):
    path = f"./src/data/chapters/{filename}"
    with open(path, 'w', encoding='utf-8') as f:
        f.write(f"import {{ Chapter }} from '../../types/quiz';\n\nexport const {var_name}: Chapter = {json.dumps(data, indent=2)};\n")
    print(f"Created {path} with {len(data['questions'])} questions")

# ==========================================
# AT-02: Fundamental Principles of Audit
# ==========================================
at02_answers = {
    1: 'B', 2: 'A', 3: 'D', 4: 'C', 5: 'C', 6: 'A', 7: 'B', 8: 'D', 9: 'C', 10: 'A',
    11: 'A', 12: 'A', 13: 'D', 14: 'B', 15: 'D', 16: 'B', 17: 'C', 18: 'D', 19: 'B', 20: 'A',
    21: 'B', 22: 'D', 23: 'D', 24: 'A', 25: 'D', 26: 'C', 27: 'A', 28: 'C', 29: 'B', 30: 'B',
    31: 'C', 32: 'D', 33: 'A', 34: 'D', 35: 'A', 36: 'D', 37: 'B', 38: 'A', 39: 'A', 40: 'D',
    41: 'D', 42: 'B', 43: 'A', 44: 'C', 45: 'B', 46: 'D', 47: 'D', 48: 'B', 49: 'A', 50: 'A',
    51: 'A', 52: 'C', 53: 'D', 54: 'B', 55: 'D', 56: 'D', 57: 'A', 58: 'C', 59: 'B', 60: 'A',
    61: 'A', 62: 'C', 63: 'A', 64: 'D', 65: 'D', 66: 'D', 67: 'B', 68: 'D', 69: 'C', 70: 'B'
}

at02_explanations = {
    2: "All of these are services offered by CPAs but choice A is the best answer because it exemplifies the purpose of Certified Public Accountants (CPAs). The audit service is meant to serve the public by enhancing the quality of information for the intended users.",
    3: "A high level of assurance provided by the auditor gives credibility to the audit opinion made at the end of the engagement, thereby increasing the user's trust on the financial statements audited.",
    5: "A is incorrect because financial statements do not determine the future stewardship of a company. B is incorrect because an independent audit is not necessary to measure and communicate financial data to its users. D is incorrect because an independent audit will never completely guarantee the accuracy of all information in the financial statements.",
    7: "B is more difficult to evaluate objectively because there are no set standards for an auditor to use as a criteria and basis of judgement.",
    10: "The primary objective of an operational audit is to increase the efficiency and effectiveness of an entity's operations geared towards achieving an entity's goals.",
    16: "The primary objective of a compliance audit is to determine if the entity is compliant with the applicable rules and regulations.",
    24: "External auditors and internal auditors do not necessarily need to have independence from their clients. External auditors must only maintain their independence during assurance engagements.",
    25: "D is correct because it describes the main objective of an audit, to communicate to the intended users an auditor's opinion on the fairness of information presented in the financial statements.",
    26: "The purpose of assurance engagements is to enhance the quality of the information used by the intended users. C is correct because it describes the main purpose of assurance engagements.",
    27: "D is correct because the audit is meant to be conducted by an independent 3rd party to give the appearance that the engagement was done without any bias and that the information presented in the financial statements are presented fairly.",
    30: "A is incorrect because absolute assurance is not attainable because of the inherent limitations of audit. B is correct because the performance of an audit falls under reasonable assurance engagements. C is incorrect because it refers to limited assurance engagements. D is incorrect because it refers to non-assurance engagements.",
    31: "C is correct because during the preparation of the financial statements, Generally Accepted Accounting Principles (GAAP) are the bases on which financial data is prepared and communicated to its intended users.",
    32: "The Philippine Standards on Auditing do not prescribe a specific or established criterion. It merely prescribes the procedures and the framework in how the audit procedure is to be performed.",
    34: "The preparation of financial statements is based on the underlying assumption that multiple types of users will use the financial statement. It is the reason why general-purpose financial statements are prepared by the reporting entity.",
    35: "B is incorrect because it is only a secondary concern of the auditor. C is incorrect because an auditor's concern is not to specifically look if fraud has occurred. D is incorrect because the correctness of the calculation of taxable income is not a primary concern of the auditor.",
    36: "A/B/C are all commonalities between accountants and auditors. D is the correct answer because the accumulation and interpretation of evidence is unique to the auditor's role.",
    40: "A/B/C all describe situations that may create doubt on the veracity of the information being provided to the users, thereby increasing the demand for an audit.",
    41: "A/B/C are all reasons why the financial information presented directly from companies may not be completely fair in its presentation to the intended users.",
    42: "B is correct because the independent audit of financial statements is not intended to simplify the economic decision making of the intended user but to make it credible and useful.",
    43: "A is correct because it will always remain to be a constant driver of demand for an independent audit, and is therefore a 'consequence'. B/C/D are incorrect because they only refer to possible reasons for the demand of an independent audit.",
    47: "Financial statements shall be prepared in accordance with PFRSs.",
    52: "Inherent limitations of an audit are the reason why an auditor can never completely eliminate the audit risk associated to the engagement. Hence, C is correct because it describes one of the main inherent limitations of an audit.",
    53: "An auditor is not meant to conduct a critical, detailed and systematic examination of all the accounts in the financial statements. They are meant to gather sufficient appropriate evidence that will support their written conclusion on the fairness of the financial statements.",
    55: "A is incorrect because absolute assurance is not attainable. B is incorrect because the evidence gathered is meant to be more persuasive than conclusive. C is incorrect because an auditor is not intended to detect all misstatements in the financial statements, only material misstatements.",
    56: "A is incorrect because management would ultimately be responsible for the financial statements reported. B is incorrect because audit engagements are meant to be conducted with a reasonable level of assurance, not limited. C is incorrect because the procedures to be used during the audit will depend on the professional judgement of the auditor.",
    60: "The Philippine Standards on Auditing (PSA) helps provide a framework for auditors that establish a guideline and standard of which the audit must be conducted.",
    61: "The auditor's professional skepticism is never eliminated during the engagement.",
    62: "A is incorrect because the planning of an engagement must be documented. B is incorrect because all decisions must be supported by the facts or circumstances surrounding the engagement. D is incorrect because it is always used in determining materiality and audit risk.",
    65: "A/B/C are all incorrect because they describe the inherent limitations of audit engagements. D is incorrect because professional accountants are presumed to have the professional competence prescribed in the code of ethics to conduct the engagements in a proper manner.",
    67: "The audit fees must remain separate from the quality of the work given. This is to prevent a self-interest threat from forming before or during an engagement.",
    69: "The final result of an audit engagement is the written communication of the audit opinion formed by the auditor. This is communicated to the intended users using an audit report."
}

at02_raw_questions = [
    # Q1
    (1, "Nature of Audit",
     "The auditor's satisfaction as to the reliability of an assertion being made by one party for use by another party is called:",
     [("A", "Opinion"), ("B", "Assurance"), ("C", "Examination"), ("D", "Verification")]),
    # Q2
    (2, "Nature of Audit",
     "The predominant type of attestation service performed by CPAs is:",
     [("A", "Audit"), ("B", "Review"), ("C", "Consulting"), ("D", "Compilation")]),
    # Q3
    (3, "Nature of Audit",
     "By providing high level of assurance on financial statements, the auditor",
     [("A", "guarantees the fair presentation of the financial statements."),
      ("B", "confirms the accuracy of the financial statements."),
      ("C", "assures the readers that fraudulent activities of employees have been detected."),
      ("D", "enhances the credibility of the financial statements.")]),
    # Q4
    (4, "Types of Audits",
     "Independent auditing can best be described as",
     [("A", "A branch of accounting."),
      ("B", "A professional activity that measures and communicates financial and business data."),
      ("C", "A discipline which attests to the results of accounting and other functional operations and data."),
      ("D", "A regulatory function that prevents the issuance of improper financial information.")]),
    # Q5
    (5, "Types of Audits",
     "The independent audit is important to readers of financial statements because it:",
     [("A", "Determines the future stewardship of the management of the company whose financial statements are audited."),
      ("B", "Measures and communicates financial and business data included in financial statements."),
      ("C", "Involves the objective audit of and reporting in management-prepared financial statements."),
      ("D", "Reports on the accuracy of all information in the financial statements.")]),
    # Q6
    (6, "Types of Audits",
     "Which of the following types of auditing is performed most commonly by professional CPAs on a contractual basis?",
     [("A", "External auditing"), ("B", "Internal auditing"), ("C", "Tax auditing"), ("D", "Government auditing")]),
    # Q7
    (7, "Types of Audits",
     "Which of the following is more difficult to evaluate objectively?",
     [("A", "Presentation of financial statements in accordance with the applicable financial reporting criteria."),
      ("B", "Efficiency and effectiveness of operations."),
      ("C", "Compliance with applicable government regulations."),
      ("D", "All these are equally difficult to evaluate objectively.")]),
    # Q8
    (8, "Types of Audits",
     "Which of the following is a typical objective of an operational audit?",
     [("A", "To determine whether an entity's internal control system is adequately operating as designed."),
      ("B", "To determine whether an entity's operational information is in accordance with PFRS."),
      ("C", "To determine whether an entity's financial statements present fairly the results of operations."),
      ("D", "To determine whether an entity's specific operating units are functioning efficiently and effectively.")]),
    # Q9
    (9, "Types of Audits",
     "A typical objective of an operational audit is for the auditor to",
     [("A", "Determine whether the financial statements fairly present the entity's operations."),
      ("B", "Evaluate the feasibility of attaining the entity's operational objectives."),
      ("C", "Make recommendations for improving performance."),
      ("D", "Report on the entity's relative success in attaining profit maximization.")]),
    # Q10
    (10, "Types of Audits",
     "The primary orientation of operational auditing is towards",
     [("A", "Future improvements to accomplish the goals of management."),
      ("B", "The accuracy of the data reflected in management's financial records."),
      ("C", "The verification that a company's financial report is fairly presented."),
      ("D", "Past protection provided by existing internal control.")]),
    # Q11
    (11, "Types of Audits",
     "Operational audits generally have been conducted by internal and COA auditors, but may be performed by CPAs. A primary purpose of an operational audit is to provide",
     [("A", "A measure of management performance in meeting organizational goals."),
      ("B", "The results of internal examinations of financial and accounting matters to a company's top-level management."),
      ("C", "Aid to the independent auditor, who is conducting the examination of the financial statements."),
      ("D", "A means of assurance that internal accounting controls are functioning as planned.")]),
    # Q12
    (12, "Types of Audits",
     "The purpose of an internal audit is\nI. To evaluate the adequacy and effectiveness of company's internal controls.\nII. To determine the extent to which assigned responsibilities are actually carried out.\nIII. To collect evidence on whether the company is continuing as a going concern.",
     [("A", "I and II only"), ("B", "I and III only"), ("C", "II and III only"), ("D", "I, II, and III")]),
    # Q13
    (13, "Types of Audits",
     "The overall objective of internal auditing is to",
     [("A", "Attest to the efficiency with which resources are employed."),
      ("B", "Ascertain that controls are costs justified."),
      ("C", "Provide assurance that financial data have been accurately recorded."),
      ("D", "Assist members of the organization in the effective discharge of their responsibilities.")]),
    # Q14
    (14, "Types of Audits",
     "Internal auditors review the adequacy of the company's internal control system primarily to",
     [("A", "Help determine the nature, timing, and extent of tests necessary to achieve audit objectives."),
      ("B", "Determine whether the internal control system provides reasonable assurance that the company's objectives and goals are met efficiently and economically."),
      ("C", "Ensure that material weaknesses in the system of internal control are corrected."),
      ("D", "Determine whether the internal control system ensures that financial statements are fairly presented.")]),
    # Q15
    (15, "Types of Audits",
     "In conducting an appraisal of the economy and efficiency with which company resources are used, an internal auditor's responsibility is to",
     [("A", "Verify the accuracy of asset valuation."),
      ("B", "Review the reliability of operating information."),
      ("C", "Verify the existence of assets."),
      ("D", "Determine whether operating standards have been established.")]),
    # Q16
    (16, "Types of Audits",
     "An audit to determine whether the auditee is following specific procedures or rules set down by some higher authority is classified as a(n)",
     [("A", "Audit of financial statements."), ("B", "Compliance audit."), ("C", "Operational audit."), ("D", "Production audit.")]),
    # Q17
    (17, "Types of Audits",
     "Which of the following types of audit uses laws and regulations as its criteria?",
     [("A", "Operational audit"), ("B", "Financial statement audit"), ("C", "Compliance audit"), ("D", "Performance audit")]),
    # Q18
    (18, "Types of Audits",
     "An audit designed to provide reasonable assurance of detecting violations of a specific provisions of contracts or grant agreements would be called a(n)",
     [("A", "Performance audit"), ("B", "Management audit"), ("C", "Operational audit"), ("D", "Compliance audit")]),
    # Q19
    (19, "Types of Audits",
     "Governmental auditing often extends beyond examinations leading to the expression of opinion on the fairness of financial presentation and includes audits of efficiency, economy, effectiveness, and also",
     [("A", "Accuracy"), ("B", "Compliance"), ("C", "Evaluation"), ("D", "Internal control")]),
    # Q20
    (20, "Types of Audits",
     "Results of compliance audits are typically reported to someone within the organizational unit being audited rather than to a broad spectrum of outside users. Which of the following audits can be regarded as generally being a compliance audit?",
     [("A", "BIR agents' examinations of taxpayer returns."),
      ("B", "COA auditors' evaluation of the computer operations of government units."),
      ("C", "An internal auditor's review of a company's payroll authorization procedures."),
      ("D", "A CPA firm's audit of the local school district.")]),
    # Q21
    (21, "Types of Auditors",
     "Which of the following best describes the reason why an independent auditor reports on financial statements?",
     [("A", "A poorly designed internal control system may be in existence."),
      ("B", "Different interests may exist between the company preparing the statements and the persons using the statements."),
      ("C", "A misstatement of account balances may exist and is generally corrected as the result of the independent auditor's work."),
      ("D", "A management fraud may exist and it is more likely to be detected by independent auditors.")]),
    # Q22
    (22, "Types of Auditors",
     "Which of the following criteria is unique to the independent auditor's attest function?",
     [("A", "General competence"),
      ("B", "Familiarity with the particular industry in which each client operates."),
      ("C", "Due professional care"),
      ("D", "Independence")]),
    # Q23
    (23, "Types of Auditors",
     "The primary goal of the CPA in performing the attest function is to",
     [("A", "detect fraud"),
      ("B", "examine individual transactions so that the auditor may certify as to their validity."),
      ("C", "assure the consistent application of correct accounting procedures."),
      ("D", "determine whether the client's assertions as embodied in the financial statements are fairly stated.")]),
    # Q24
    (24, "Types of Auditors",
     "Which of the following is not a similarity between external and internal auditors?",
     [("A", "Both auditors must be independent of the company."),
      ("B", "Both auditors must be competent."),
      ("C", "Both auditors follow a similar methodology in performing their audits."),
      ("D", "Both auditors consider risk and materiality deciding the extent of their tests and evaluating results.")]),
    # Q25
    (25, "Financial Statement Audit",
     "The primary purpose of an independent audit of financial statements is to:",
     [("A", "provide a basis for assessing management's performance."),
      ("B", "comply with laws and regulations."),
      ("C", "assure management that the financial statements are unbiased and free from material misstatements."),
      ("D", "provide users with an unbiased opinion about the fairness of information presented in the financial statements.")]),
    # Q26
    (26, "Financial Statement Audit",
     "The purpose of an audit of financial statements is to:",
     [("A", "Relieve management or those charged with governance of the responsibility for the preparation and presentation of financial statements."),
      ("B", "Obtain an absolute level of assurance that the financial statements as a whole are free from material misstatement."),
      ("C", "Enhance the degree of confidence of intended users in the financial statements."),
      ("D", "Assure the future viability of the entity by expressing an opinion on the entity's financial statements.")]),
    # Q27
    (27, "Financial Statement Audit",
     "The primary reason for a financial statement audit by an independent CPA is to:",
     [("A", "Provide increased assurance to users as to the fairness of the financial statements."),
      ("B", "Guarantee that there are no misstatements in the financial statements and ensure that any fraud will be discovered."),
      ("C", "Satisfy governmental regulatory requirements."),
      ("D", "Relieve management of responsibility for the financial statements.")]),
    # Q28
    (28, "Financial Statement Audit",
     "A financial statement audit aids in the communication of economic data because the audit",
     [("A", "Assures the readers of financial statements that any fraudulent activity has been corrected."),
      ("B", "Guarantees that financial data are fairly presented."),
      ("C", "Lends credibility to the financial statements."),
      ("D", "Confirms the accuracy of management's financial reporting representations.")]),
    # Q29
    (29, "Financial Statement Audit",
     "An audit of financial statements is conducted to determine if the",
     [("A", "Client's internal control is functioning as intended."),
      ("B", "Overall financial statements are stated in accordance with the applicable financial reporting framework."),
      ("C", "Organization is operating efficiently and effectively."),
      ("D", "Auditee client is following specific procedures or rules set down by some higher authority.")]),
    # Q30
    (30, "Financial Statement Audit",
     "What level of assurance is provided by the auditor in an audit engagement?",
     [("A", "Absolute"), ("B", "High, but not absolute"), ("C", "Moderate"), ("D", "No assurance")]),
    # Q31
    (31, "Financial Statement Audit",
     "In the audit of historical financial statements, which of the following accounting bases is the most common?",
     [("A", "Cash basis of accounting."),
      ("B", "Regulatory accounting principles."),
      ("C", "Generally accepted accounting principles."),
      ("D", "Liquidation basis of accounting.")]),
    # Q32
    (32, "Financial Statement Audit",
     "An audit entails determining the degree of correspondence between assertions and established criteria. Which of the following is not a valid criterion for financial statements audit?",
     [("A", "International Accounting Standards"),
      ("B", "Authoritative financial reporting framework"),
      ("C", "Accounting standards generally accepted in the Philippines"),
      ("D", "Philippine Standards on Auditing"),
      ("E", "All of these are valid criterion for financial statements audit.")]),
    # Q33
    (33, "Financial Statement Audit",
     "In financial statement audits, the audit process should be conducted in accordance with:",
     [("A", "Philippine Standards on Auditing."),
      ("B", "Philippine Accounting Standards."),
      ("C", "Philippine Financial Reporting Standards."),
      ("D", "Philippine GAAP.")]),
    # Q34
    (34, "Financial Statement Audit",
     "The assumption underlying an audit of financial statements is that they will be used by",
     [("A", "The regulatory agencies to verify information that is relevant to their supervisory functions."),
      ("B", "The board of directors as basis declaring cash dividends."),
      ("C", "The public in making investment decisions."),
      ("D", "Different groups for different purposes.")]),
    # Q35
    (35, "Financial Statement Audit",
     "In auditing financial statements, the primary concern is with",
     [("A", "Determining whether recorded information properly reflects the economic events that occurred during the accounting period."),
      ("B", "Analyzing the financial information to be sure that it complies with government requirements."),
      ("C", "Determining if fraud has occurred."),
      ("D", "Determining if taxable income has been calculated correctly.")]),
    # Q36
    (36, "Financial Statement Audit",
     "The trait that distinguishes auditors from accountants is the",
     [("A", "auditor's education beyond the Bachelor's degree."),
      ("B", "auditor's ability to interpret accounting standards."),
      ("C", "auditor's ability to interpret PFRS."),
      ("D", "auditor's accumulation and interpretation of evidence related to the company's financial statements.")]),
    # Q37
    (37, "Financial Statement Audit",
     "Which of the following is not an assurance that the auditors give to the parties who rely on the financial statements?",
     [("A", "Auditors know how the amounts and disclosures in the financial statements were produced."),
      ("B", "Auditors give assurance that the financial statements are accurate."),
      ("C", "Auditors gathered enough evidence to provide a reasonable basis for forming an opinion."),
      ("D", "If the evidence allows the auditors to do so, auditors give assurance in the form of opinion, as to whether the financial statements taken as a whole are fairly presented in conformity with PFRS.")]),
    # Q38
    (38, "Financial Statement Audit",
     "In \"auditing\" financial accounting data, the primary concern is with:",
     [("A", "determining whether recorded information properly reflects the economic events that occurred during the accounting period."),
      ("B", "determining if fraud has occurred."),
      ("C", "determining if taxable income has been calculated correctly."),
      ("D", "analyzing the financial information to be sure that it complies with government requirements.")]),
    # Q39
    (39, "Financial Statement Audit",
     "The auditor's judgment concerning the overall fairness of the presentation of financial position, results of operations, and changes in financial position is applied within the framework of",
     [("A", "Generally accepted accounting principles."),
      ("B", "Generally accepted auditing standards."),
      ("C", "Internal control."),
      ("D", "Information systems control.")]),
    # Q40
    (40, "Financial Statement Audit",
     "Which of the following statements does not describe a condition that creates a demand for auditing?",
     [("A", "Conflict between an information provider and a user can result in biased information."),
      ("B", "Information can have substantial economic consequences for a decision maker."),
      ("C", "Expertise is often required for information preparation and verification."),
      ("D", "Users can directly assess the quality of information.")]),
    # Q41
    (41, "Financial Statement Audit",
     "Financial statement users often receive unreliable financial information from companies. Which of the following is not a common reason for this?",
     [("A", "Complex exchange transactions."),
      ("B", "Voluminous data."),
      ("C", "Bias in the preparation of financial statements."),
      ("D", "Each of these choices is a common reason for unreliable financial information.")]),
    # Q42
    (42, "Financial Statement Audit",
     "Which one of the following is not among the conditions that give rise to a demand by external users for independent audits of financial statements?",
     [("A", "remoteness of users."),
      ("B", "complexity of making economic decisions."),
      ("C", "potential conflict of interest between users and preparers of the statements."),
      ("D", "consequence for making decisions.")]),
    # Q43
    (43, "Financial Statement Audit",
     "There are conditions that give rise to the need for independent audits of financial statements. One of these conditions is consequence. In this context, consequence means that the:",
     [("A", "Financial statements are used for important decisions."),
      ("B", "Users of the statements may not fully understand the consequences of their actions."),
      ("C", "Auditor must anticipate all possible consequences of the report issued."),
      ("D", "Impact of using different accounting methods may not be fully understood by the users of the statements.")]),
    # Q44
    (44, "Financial Statement Audit",
     "Which of the following best describes why an independent auditor is asked to express an opinion on the fair presentation of financial statements?",
     [("A", "It is difficult to prepare financial statements that fairly present a company's financial position, cash flow, and operations without the expertise of an independent auditor."),
      ("B", "It is management's responsibility to seek available independent aid in the appraisal of the financial information shown in its financial statements."),
      ("C", "The opinion of an independent party is needed because a company may not be objective with respect to its own financial statements."),
      ("D", "It is a customary courtesy that all stockholders of a company receive an independent report on management's stewardship in managing the affairs of the business.")]),
    # Q45
    (45, "Financial Statement Audit",
     "The market for auditing services is driven by",
     [("A", "The regulatory authority of the Securities and Exchange Commission."),
      ("B", "A demand by external users of financial statements."),
      ("C", "Pronouncements issued by the AASC."),
      ("D", "Congress.")]),
    # Q46
    (46, "Elements of Theoretical Framework of Auditing",
     "Which of the following statements does not properly describe an element of theoretical framework of auditing?",
     [("A", "An audit benefits the public."),
      ("B", "The data to be audited can be verified."),
      ("C", "Short-term conflicts may exist between managers who prepare the data and auditors who examine the data."),
      ("D", "Auditors act on behalf of the management.")]),
    # Q47
    (47, "Elements of Theoretical Framework of Auditing",
     "The auditor's judgement concerning the overall fairness of presentation of financial position, results of operation, and changes in cash flow is applied within the framework of",
     [("A", "quality control."),
      ("B", "generally accepted auditing standards which include the concept of materiality."),
      ("C", "the auditor's evaluation of the audited company's internal control."),
      ("D", "Philippine Financial Reporting Standards.")]),
    # Q48
    (48, "Elements of Theoretical Framework of Auditing",
     "The criteria for evaluating quantitative information vary. Example, in the audit of historical financial statements by CPA firms, the criteria are usually",
     [("A", "Standards on Auditing."),
      ("B", "Financial Reporting Standards."),
      ("C", "Bureau of Internal Revenue Regulations."),
      ("D", "Securities and Exchange Commission Regulations.")]),
    # Q49
    (49, "Elements of Theoretical Framework of Auditing",
     "The overall objectives of the auditor in conducting an audit of financial statements are\nI. To obtain reasonable assurance about whether the financial statements as a whole are free from material misstatement, whether caused by fraud or error.\nII. To report on the financial statements.\nIII. To obtain conclusive rather than persuasive evidence.\nIV. To detect all misstatements, whether due to fraud or error.",
     [("A", "I and II only"), ("B", "II and IV only"), ("C", "I, II, and III only"), ("D", "I, II, III, IV")]),
    # Q50
    (50, "Elements of Theoretical Framework of Auditing",
     "An audit in accordance with PSAs is performed on the premise that management and, where appropriate, those charged with governance have responsibilities that are fundamental to the conduct of the audit. Which of the following is not one of those responsibilities?",
     [("A", "To comply with all relevant PSAs in the preparation and presentation of the entity's financial statements."),
      ("B", "To provide the auditor with all information, such as records and documentation, and other matters that are relevant to the preparation and presentation of the financial statements."),
      ("C", "To provide unrestricted access to those within the entity from whom the auditor determines it necessary to obtain audit evidence."),
      ("D", "To design, implement, and maintain internal control relevant to the preparation and presentation of financial statements that are free from material misstatement, whether caused by fraud or error.")]),
    # Q51
    (51, "General Principles of Financial Statement Audit",
     "The auditor is required to maintain professional skepticism throughout the audit. Which of the following statements concerning professional skepticism is false?",
     [("A", "A belief that management and those charged with governance are honest and have integrity relieves the auditor of the need to maintain professional skepticism."),
      ("B", "Maintaining professional skepticism throughout the audit reduces the risk of using inappropriate assumptions in determining the nature, timing, and extent of the audit procedures and evaluating the results thereof."),
      ("C", "Professional skepticism is necessary to the critical assessment of audit evidence."),
      ("D", "Professional skepticism is an attitude that includes questioning contradictory audit evidence obtained.")]),
    # Q52
    (52, "General Principles of Financial Statement Audit",
     "Which of the following is one of the limitations of an audit?",
     [("A", "The possibility that management may prevent the auditor from performing the necessary audit procedures."),
      ("B", "The likelihood that the auditor may not be able to detect material misstatements in the financial statements because the auditor is engaged only after year-end."),
      ("C", "The fact that most audit evidence is persuasive rather than conclusive in nature."),
      ("D", "The risk that the auditor may not possess the training and proficiency required by the engagement.")]),
    # Q53
    (53, "General Principles of Financial Statement Audit",
     "In an audit of financial statements, the overall objectives of the auditor are the following except",
     [("A", "To obtain reasonable assurance whether the financial statements are free from material misstatements whether due to fraud or error."),
      ("B", "To enable the auditor to express an opinion on whether the financial statements are prepared, in all material respects in accordance with the applicable financial reporting framework."),
      ("C", "To report on the financial statements and communicate as required by the PSAs, in accordance with the auditor's findings."),
      ("D", "To conduct a critical, detailed, and systematic examination of all the accounts in the financial statements, as the related document records, procedures, and control."),
      ("E", "All of these are the overall objectives of the auditor.")]),
    # Q54
    (54, "General Principles of Financial Statement Audit",
     "An audit of the financial statements of BCSV Corp. is being conducted by an external auditor. The external auditor is expected to",
     [("A", "Express an opinion as to the accurateness of BCSV Corp.'s financial statements."),
      ("B", "Express an opinion as to the fairness of BCSV Corp.'s financial statements."),
      ("C", "Certify the correctness of BCSV Corp.'s financial statements."),
      ("D", "Examine all evidence supporting BCSV Corp.'s financial statements.")]),
    # Q55
    (55, "General Principles of Financial Statement Audit",
     "Which of the following is not an objective of the auditor in conducting an audit of financial statements?",
     [("A", "To obtain absolute assurance whether the financial statements are free from material misstatements whether due to fraud or error."),
      ("B", "To obtain conclusive rather than persuasive evidence to support his/her opinion on the financial statements."),
      ("C", "To detect all misstatements in the financial statements, whether due to fraud or error."),
      ("D", "All of these are not objectives of the auditor in conducting an audit of financial statements.")]),
    # Q56
    (56, "General Principles of Financial Statement Audit",
     "Which of the following statements about financial statements audit is not correct?",
     [("A", "The audit of financial statements relieves management of its responsibilities for the financial statements."),
      ("B", "An audit is designed to provide limited assurance that the financial statements taken are free material misstatements."),
      ("C", "The procedures required to conduct an audit in accordance with PSAs should be determined by the client who engaged the services of the auditor."),
      ("D", "All of these are not correct about financial statements audit.")]),
    # Q57
    (57, "General Principles of Financial Statement Audit",
     "The objective of the ordinary examination by the independent auditor is the expression of an opinion on",
     [("A", "The fairness of the financial statements."),
      ("B", "The accuracy of the financial statements."),
      ("C", "The accuracy of the annual report."),
      ("D", "The balance sheet and income statement.")]),
    # Q58
    (58, "General Principles of Financial Statement Audit",
     "As used in auditing, which of the following statements best describes \"assertions\"?",
     [("A", "Assertions are the representations of management as to the reliability of the information system."),
      ("B", "Assertions are the auditor's findings to be communicated in the audit report."),
      ("C", "Assertions are the representations of management as to the fairness of the financial statements."),
      ("D", "Assertions are found only in the footnotes to the financial statements.")]),
    # Q59
    (59, "General Principles of Financial Statement Audit",
     "Broadly defined, the subject matter of any audit consists of",
     [("A", "Financial statements"), ("B", "Assertions"), ("C", "Economic data"), ("D", "Operating data")]),
    # Q60
    (60, "General Principles of Financial Statement Audit",
     "Whenever a CPA is engaged to perform an audit of financial statements according to Philippine Standard on Auditing, he is required to comply with those standards to",
     [("A", "Meet the minimum requirement when providing audit services."),
      ("B", "Eliminate audit risk."),
      ("C", "To reduce the management's responsibility."),
      ("D", "Eliminate the professional judgment in resolving audit issues.")]),
    # Q61
    (61, "General Principles of Financial Statement Audit",
     "The auditor is required to maintain professional skepticism throughout the audit. Which of the following statements concerning professional skepticism is false?",
     [("A", "A belief that management and those charged with governance are honest and have integrity relieved the auditor of the need to maintain professional skepticism."),
      ("B", "Maintaining professional skepticism throughout the audit reduces the risk of using inappropriate assumptions in determining the nature, timing and extent of the audit procedure and evaluating the results thereof."),
      ("C", "Professional skepticism is necessary to the critical assessment of audit evidence."),
      ("D", "Professional skepticism is an attitude that includes questioning contradictory audit evidence obtained.")]),
    # Q62
    (62, "General Principles of Financial Statement Audit",
     "Professional judgement",
     [("A", "Should be exercised in planning and performing an audit of financial statements but need not be documented."),
      ("B", "Can be used as the justification for the decisions made by the auditor that are not supported by the facts and circumstances of the engagement."),
      ("C", "Is necessary in the evaluation of management's judgements in applying the entity's applicable financial reporting framework."),
      ("D", "Is not used in making decisions about materiality and audit risk.")]),
    # Q63
    (63, "General Principles of Financial Statement Audit",
     "Information risk refers to the risk that",
     [("A", "The client's financial statements may be materially misstated."),
      ("B", "The auditor may express an unqualified opinion on financial statements that are materially misstated."),
      ("C", "The client entity may not be able to remain in business."),
      ("D", "Errors and frauds would not be detected by the auditor's procedures.")]),
    # Q64
    (64, "General Principles of Financial Statement Audit",
     "Which of the following is a cause of information risk?",
     [("A", "Voluminous data."),
      ("B", "Biases and motives of the provider of information."),
      ("C", "Remoteness of the provider of the information."),
      ("D", "Each of these is a cause of information risk.")]),
    # Q65
    (65, "Nature of Audit Risk",
     "Theoretically, it is possible to provide an infinite range of assurance from a very low level of assurance to an absolute level of assurance. In practice, the professional accountants cannot provide absolute assurance because of the following, except",
     [("A", "The professional accountants employ sampling process."),
      ("B", "The internal control has its inherent limitations"),
      ("C", "The use of judgment in gathering evidence and drawing conclusions based on that evidence"),
      ("D", "The lack of expertise of the professional accountants in doing a systematic engagement process.")]),
    # Q66
    (66, "Nature of Audit Risk",
     "Reducing assurance engagement risk to zero is very rarely attainable or cost beneficial as a result of the following factors, except",
     [("A", "The use of selective testing."),
      ("B", "The fact that much of the evidence available to the practitioner is persuasive rather than conclusive."),
      ("C", "The use of judgement in gathering and evaluating evidence and forming conclusions based on that evidence."),
      ("D", "The practitioner may not have the required assurance knowledge and skills to gather and evaluate evidence."),
      ("E", "All of these.")]),
    # Q67
    (67, "Nature of Audit Risk",
     "Which of the following elements does not relate to audit quality?",
     [("A", "Audit competence"), ("B", "Audit fees"), ("C", "Independence"), ("D", "Due diligence")]),
    # Q68
    (68, "Nature of Audit Risk",
     "Given that an audit in accordance with generally accepted auditing standards is influenced by the possibility of material errors and fraud, the auditor should conduct the audit with an attitude of",
     [("A", "Professional responsiveness"), ("B", "Conservative advocacy"), ("C", "Objective judgment"), ("D", "Professional skepticism")]),
    # Q69
    (69, "The Financial Statement Audit Process",
     "The auditor communicates the results of his or her work through the",
     [("A", "Engagement letter."), ("B", "Management letter."), ("C", "Audit report."), ("D", "Financial statements.")]),
    # Q70
    (70, "The Financial Statement Audit Process",
     "Which of the following is the correct order of steps in the audit process?\nI. Substantive testing\nII. Post-audit responsibilities\nIII. Completion of the audit\nIV. Planning the audit\nV. Client acceptance or continuation\nVI. Issuance of the audit report\nVII. Study and evaluation of internal controls",
     [("A", "V, IV, I, VII, III, VI, II"),
      ("B", "V, IV, VII, I, III, VI, II"),
      ("C", "IV, V, VII, I, III, VI, II"),
      ("D", "IV, V, I, VII, III, VI, II")])
]

chapter02_data = {
    "id": "at-02",
    "code": "AT-02",
    "title": "Fundamental Principles of Audit",
    "description": "Nature and objectives of financial statement, operational, and compliance audits; types of auditors; theoretical framework; and audit process phases.",
    "objectives": [
        "Nature of Audit",
        "Types of Audits",
        "Types of Auditors",
        "Financial Statement Audit",
        "Elements of Theoretical Framework of Auditing",
        "General Principles of Financial Statement Audit",
        "Nature of Audit Risk",
        "The Financial Statement Audit Process"
    ],
    "totalQuestions": 70,
    "questions": []
}

for item in at02_raw_questions:
    num, obj, q_text, opts = item
    correct = at02_answers[num]
    expl = at02_explanations.get(num, f"Suggested Answer: {correct}. In accordance with Philippine Standards on Auditing (PSA) and general auditing principles.")
    chapter02_data["questions"].append({
        "id": f"at02-{num}",
        "number": num,
        "chapterId": "at-02",
        "chapterCode": "AT-02",
        "chapterTitle": "Fundamental Principles of Audit",
        "objective": obj,
        "question": q_text,
        "options": [{"key": k, "text": t} for k, t in opts],
        "correctAnswer": correct,
        "explanation": expl
    })

save_chapter('at02.ts', 'chapter02', chapter02_data)

print("AT-02 generated successfully.")
